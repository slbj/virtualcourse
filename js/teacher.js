(function ($) {

    var app = $.sammy('#teacher-catalog', function () {

        this.use('Template');
        this.use('Session');

        this.around(function (callback) {
            var context = this;
            this.load('http://localhost:8080/teacher/teachers')
                .then(function (teachers) {
                    context.teachers = teachers;
                })
                .then(callback);
        });

        this.get('#/', function (context) {
            context.app.swap('');
            var teacherList = "";
            $.each(context.teachers, function (i, n) {
                teacherList += '<a href="#/teacher/' + n["email"] + '">\n' +
                    '                    <div class="col-md-3 col-sm-3 animate-box fadeInUp animated-fast">\n' +
                    '                        <div class="trainers-entry">\n' +
                    '                            <div class="desc">\n' +
                    '                                <h3>' + n["displayName"] + '</h3>\n' +
                    '                                <span>' + n["description"] + '</span>\n' +
                    '                            </div>\n' +
                    '                            <div class="trainer-img" style="background-image: url(images/person2.jpg)"></div>\n' +
                    '                            <div class="desc">\n' +
                    '                                <p>\n' +
                    '                                <ul class="colorlib-social-icons">\n' +
                    '                                    <li><a href="#"><i class="icon-twitter"></i></a></li>\n' +
                    '                                    <li><a href="#"><i class="icon-facebook"></i></a></li>\n' +
                    '                                    <li><a href="#"><i class="icon-linkedin"></i></a></li>\n' +
                    '                                    <li><a href="#"><i class="icon-dribbble"></i></a></li>\n' +
                    '                                </ul>\n' +
                    '                                </p>\n' +
                    '                                <p>学为人师，行为世范</p>\n' +
                    '                            </div>\n' +
                    '                        </div>\n' +
                    '                    </div>\n' +
                    '                </a>';
            });

            $("#teacher-catalog").append(teacherList);
        });

        this.get('#/teacher/:email', function (context) {
            var teacher = context.teachers.find(x => x.email === this.params['email']);

            $("#page").css({display: "none"});
            $("#newPage").css({display: "block"});
            $("#teacherName").text(course.teacherName);
            // $("#teacher strong").text(course.teacher);
            $("#teacherDescription").text(teacher.description);

        });

    });

    $(function () {
        app.run('#/');
    });

})(jQuery);
