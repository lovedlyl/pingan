// 引入模块
var gulp = require("gulp");
var browserSync = require("browser-sync").create(),
    reload = browserSync.reload,
    stream = browserSync.stream;
var pug = require("gulp-pug");
var uglify = require("gulp-uglify");
var plumber = require("gulp-plumber");
var sass = require("gulp-ruby-sass");
var cssMin = require("gulp-clean-css");
var concat = require("gulp-concat");
var webserver = require("gulp-webserver");
var url = require("url");
var htmlMin = require("gulp-htmlmin");
// 引入库文件
var lib = function() {
    gulp.src(["bower_components/zepto/src/zepto.js",
            "bower_components/zepto/src/event.js",
            "bower_components/zepto/src/touch.js",
            "bower_components/zepto/src/fx.js"
        ])
        .pipe(concat("zepto.min.js"))
        .pipe(uglify())
        .pipe(gulp.dest("dist/js"))
        .pipe(gulp.dest("../lovedlyl.github.io/pingan/js"))
}


lib();
gulp.task("lib", lib);

// 脚本文件
var scripts = function() {
    gulp.src([
            "app/js/index.js"
        ])
        .pipe(plumber())
        .pipe(concat("index.js"))
        .pipe(gulp.dest("dist/js"))
        .pipe(uglify())
        .pipe(plumber.stop())
        .pipe(gulp.dest("../lovedlyl.github.io/pingan/js"))
        .pipe(stream());
    // 自己写的插件
    gulp.src("app/js/plugins/*.js")
        .pipe(concat("plugins.js"))
        .pipe(gulp.dest("dist/js"))
        .pipe(uglify())
        .pipe(plumber.stop())
        .pipe(gulp.dest("../lovedlyl.github.io/pingan/js"))
        .pipe(stream());
    // 测试文件
    gulp.src("app/js/test/*.js")
        .pipe(gulp.dest("test/unit"));
}
scripts();
gulp.task("scripts", scripts);

// pug 文件转译
var convertPug = function() {
    gulp.src(["app/*.pug", "!app/_*.pug"])
        .pipe(plumber())
        .pipe(pug({ pretty: true }))
        .pipe(gulp.dest("dist"))
        .pipe(htmlMin({ collapseWhitespace: true }))
        .pipe(plumber.stop())
        .pipe(gulp.dest("../lovedlyl.github.io/pingan"))
        .pipe(stream());
    // 内联脚本
    gulp.src("app/js/.html.js")
        .pipe(stream());

}


convertPug();
gulp.task("convertPug", convertPug);



// sass 文件转译
var styles = function() {
    return sass('app/sass/*.sass')
        .on('error', function(err) {
            console.error('Error!', err.message);
        })
        .pipe(concat("main.css"))
        .pipe(gulp.dest('dist/css'))
        .pipe(cssMin())
        .pipe(gulp.dest("../lovedlyl.github.io/pingan/css"))
        .pipe(stream())

    // return gulp.src('app/sass/*.sass')
    //     .pipe(sass().on('error', sass.logError))
    //     .pipe(concat("main.css"))
    //     .pipe(gulp.dest('dist/css'))
    //     .pipe(cssMin())
    //     .pipe(gulp.dest("../lovedlyl.github.io/pingan/css"))
    //     .pipe(stream())
}

styles();
gulp.task("styles", styles);


// // ..............



gulp.task("default", function() {
    browserSync.init({
        server: "../lovedlyl.github.io/pingan"
        // server: "dist"
    });
    gulp.watch(["app/*.pug", "app/js/*.html.js"], ["convertPug", browserSync.reload]);
    gulp.watch("app/sass/*.sass", ["styles", browserSync.reload]);
    gulp.watch(["app/js/**/*.js"], ["scripts", browserSync.reload]);

});
