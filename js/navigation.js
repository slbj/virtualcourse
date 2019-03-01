$(document).ready(function () {
    var displayName = window.localStorage.getItem("displayName");
    if (displayName != null) {
        $("#displayName").css({display: "block"});
        $("#displayName").text(displayName);
        $("#openLoginBtn").css({display: "none"});
        $("#logoutBtn").css({display: "block"});
        $('body').attr("style", "overflow:auto")
    }

    $("#loginForm").submit(function (e) {
        e.preventDefault();
    });

    $("#loginBtn").click(function () {
        var userName = $('#userName').val();
        var password = $('#password').val();
        $.ajax({
            url: 'http://localhost:8080/identity/login/pwd/user',
            contentType: "application/json; charset=utf-8",
            type: 'POST',
            crossDomain : true,
            data: JSON.stringify({"email":userName,"password":password}),
            datatype: 'json',
            success: function (resp, status, xhr) {
                window.localStorage.setItem("email", resp.email);
                window.localStorage.setItem("displayName", resp.displayName);
                $('#login-modal').modal().hide();
                $("#displayName").css({display: "block"});
                $("#displayName").text(resp.displayName);
                $("#openLoginBtn").css({display: "none"});
                $("#logoutBtn").css({display: "block"});
                $('body').attr("style", "overflow:auto");
            },
            error: function (jqXHR, textStatus, errorThrown) {
                $(".login-info").css({display: "block"});
            }
        });
    });

    $("#logoutBtn").click(function () {
        window.localStorage.removeItem("email");
        window.localStorage.removeItem("displayName");
        $("#displayName").css({display: "none"});
        $("#displayName").text("");
        $("#openLoginBtn").css({display: "block"});
        $("#logoutBtn").css({display: "none"});
    });

    $("#openSignupBtn").click(function () {
        $('#loginForm').trigger("reset");
        $("#login-modal").css({display: "none"});
        $(".login-info").css({display: "none"});
    });

    $("#signupBtn").click(function () {
        var userName = $('#signup_email').val();
        var password = $('#signup_password').val();
        var lastName = $('#signup_lastName').val();
        var firstName = $('#signup_firstName').val();
        var displayName = $('#signup_displayName').val();
        $.ajax({
            url: 'http://localhost:8080/identity/signup/pwd/user',
            contentType: "application/json; charset=utf-8",
            type: 'POST',
            crossDomain : true,
            data: JSON.stringify({"email":userName,"password":password, "lastName":lastName, "firstName":firstName, "displayName":displayName}),
            datatype: 'json',
            success: function (resp, status, xhr) {
                window.localStorage.setItem("email", resp.email);
                window.localStorage.setItem("displayName", resp.displayName);
                $('#signup-modal').modal().hide();
                $("#displayName").css({display: "block"});
                $("#displayName").text(resp.displayName);
                $("#openLoginBtn").css({display: "none"});
                $("#logoutBtn").css({display: "block"});
                $('body').attr("style", "overflow:auto")
            },
            error: function (jqXHR, textStatus, errorThrown) {
                $(".signup-info").css({display: "block"});
            }
        });
    });

    $("#signupForm").submit(function (e) {
        e.preventDefault();
    });

    $("#login-modal .close").click(function () {
        $('#loginForm').trigger("reset");
        $(".login-info").css({display: "none"});
    });

    $("#signup-modal .close").click(function () {
        $('#signupForm').trigger("reset");
        $(".signup-info").css({display: "none"});
    });

    setActiveNavigation();
});

function setActiveNavigation() {
    // Get page name by parsing url
    var urlPath = window.location.pathname;
    var urlPathArray = urlPath.split('/');
    var pageName = urlPathArray[urlPathArray.length-1].replace(".html", "");

    // Deactive the active link
    var activeLink = $(".navigation-links.active");
    var unactiveClassValue = activeLink.attr("class").replace(" active", "");
    activeLink.attr("class", unactiveClassValue);

    // Make current page as active
    var currentLink = $("[name='navigation-links-" + pageName + "']");
    var abc = currentLink.attr("class").concat(" active");
    currentLink.attr("class", abc);
}