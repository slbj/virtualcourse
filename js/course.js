(function ($) {

    var app = $.sammy('#course-catalog', function () {

        this.use('Template');
        this.use('Session');

        this.around(function (callback) {
            var context = this;
            this.load('http://localhost:8080/content/courses')
                .then(function (courses) {
                    context.courses = courses;
                })
                .then(callback);
        });

        this.get('#/', function (context) {
            context.app.swap('');
            var courseList = "";
            $.each(context.courses, function (i, n) {
                courseList += '<div class="col-md-4 animate-box fadeInUp animated-fast">\n' +
                    '                    <div class="classes">\n' +
                    '                        <div class="classes-img" style="background-image: url(images/classes-1.jpg);">\n' +
                    '                        </div>\n' +
                    '                        <div class="wrap">\n' +
                    '                            <div class="desc">\n' +
                    '                                <span class="teacher">' + n["teacher"] + '</span>\n' +
                    '                                <h3><a href="#/course/' + n["courseId"] + '">' + n["courseName"] + '</a></h3>\n' +
                    '                            </div>\n' +
                    '                            <div class="pricing">\n' +
                    '                                <p><span class="price">¥2000</span> <span class="price old-price">¥3500</span> <span\n' +
                    '                                        class="more"><a href="#"><i class="icon-link"></i></a></span></p>\n' +
                    '                            </div>\n' +
                    '                        </div>\n' +
                    '                    </div>\n' +
                    '                </div>';
            });

            $("#course-catalog").append(courseList);
        });

        this.get('#/course/:id', function (context) {
            var course = context.courses.find(x => x.courseId === this.params['id']);
            // var content = generateCoursePage1(course);


            $("#page").css({display: "none"});
            $("#newPage").css({display: "block"});
            $("#courseName").text(course.courseName);
            $("#teacher strong").text(course.teacher);
            $("#courseDescription").text(course.description);


            // $("body").empty();
            // $("body").append("<h1>Heelo aaa!</h1>");

            // $("#course-catalog").remove();
            // $("#course-catalog").append(content);
            // alert(content);
            // $("body").text(content);

            // this.partial('templates/course.template');


            // context.render('templates/course.template', {id: course.courseId, item: course})
            //     .appendTo(context.$element());

            // $('#title').text('continue reading');
        });

    });

    $(function () {
        app.run('#/');
    });

    // function generateCoursePage(course) {
    //     return '<div class="flexslider">\n' +
    //         '            <ul class="slides">\n' +
    //         '                <li style="background-image: url(images/img_bg_2.jpg);">\n' +
    //         '                    <div class="overlay"></div>\n' +
    //         '                    <div class="container-fluid">\n' +
    //         '                        <div class="row">\n' +
    //         '                            <div class="col-md-6 col-sm-12 col-md-offset-3 col-xs-12 slider-text">\n' +
    //         '                                <div class="slider-text-inner text-center">\n' +
    //         '                                    <h1 id="courseTitle">' + course.courseName + '</h1>\n' +
    //         '                                    <h2 class="breadcrumbs"><span><a href="index.html">主页</a></span> | <span>课程</span>\n' +
    //         '                                    </h2>\n' +
    //         '                                    <a href="classroom.html">\n' +
    //         '                                        <button type="button" class="btn btn-primary">开 始 上 课</button>\n' +
    //         '                                    </a>\n' +
    //         '                                </div>\n' +
    //         '                            </div>\n' +
    //         '                        </div>\n' +
    //         '                    </div>\n' +
    //         '                </li>\n' +
    //         '            </ul>\n' +
    //         '        </div>';
    // }

    function generateCoursePage(course) {
        return '<div class="flexslider">\n' +
            '            <ul class="slides">\n' +
            '                <li style="background-image: url(images/img_bg_2.jpg);">\n' +
            '                    <div class="overlay"></div>\n' +
            '                    <div class="container-fluid">\n' +
            '                        <div class="row">\n' +
            '                            <div class="col-md-6 col-sm-12 col-md-offset-3 col-xs-12 slider-text">\n' +
            '                                <div class="slider-text-inner text-center">\n' +
            '                                    <h1 id="courseTitle">' + course.courseName + '</h1>\n' +
            '                                    <h2 class="breadcrumbs"><span><a href="index.html">主页</a></span> | <span>课程</span>\n' +
            '                                    </h2>\n' +
            '                                    <a href="classroom.html">\n' +
            '                                        <button type="button" class="btn btn-primary">开 始 上 课</button>\n' +
            '                                    </a>\n' +
            '                                </div>\n' +
            '                            </div>\n' +
            '                        </div>\n' +
            '                    </div>\n' +
            '                </li>\n' +
            '            </ul>\n' +
            '        </div>';
    }

    function generateCoursePage1(course) {
        return '<div id="navigation"></div>';
    }

})(jQuery);
