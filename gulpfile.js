let gulp = require("gulp"),
    sass = require("gulp-sass"),
    rename = require("gulp-rename"),
    browserSync = require("browser-sync"),
    autoprefixer = require("gulp-autoprefixer"),
    concat = require("gulp-concat"),
    uglify = require("gulp-uglify"),
    cssmin = require("gulp-cssmin");

gulp.task("sass", function() {
    return gulp
        .src("app/scss/**/*.scss")
        .pipe(
            sass({
                outputStyle: "compressed",
            })
        )
        .pipe(
            rename({
                suffix: ".min",
            })
        )
        .pipe(
            autoprefixer({
                overrideBrowserslist: ["last 8 version"],
            })
        )
        .pipe(gulp.dest("app/css"))
        .pipe(
            browserSync.reload({
                stream: true,
            })
        );
});

gulp.task("script", function() {
    return gulp
        .src([
            "node_modules/jquery/dist/jquery.js",
            "node_modules/slick-carousel/slick/slick.js",
            /*   "node_modules/magnific-popup/dist/jquery.magnific-popup.js", */
            /* "node_modules/mixitup/dist/mixitup.js", */
            /*  "node_modules/rateyo/src/jquery.rateyo.js", */
            /*  "node_modules/ion-rangeslider/js/ion.rangeSlider.js", */
            /*     "node_modules/@fancyapps/fancybox/dist/jquery.fancybox.js", */
            /*  "node_modules/malihu-custom-scrollbar-plugin/jquery.mCustomScrollbar.js",
                 "node_modules/fontawesome-pro-5.8.2-web/all.js", */
            "node_modules/wowjs/wow.js",
            /*    "node_modules/focus-visible/dist/focus-visible.js",
               "node_modules/paginationjs/dist/pagination.js",  */
            /* "node_modules/swiper/swiper.js", */
            /* "node_modules/jquery-form-styler/dist/jquery.formstyler.js",  */
        ])
        .pipe(concat("libs.min.js"))
        .pipe(uglify())
        .pipe(gulp.dest("app/js"));
});
gulp.task("style", function() {
    return gulp
        .src([
            "node_modules/slick-carousel/slick/slick.css",
            /*   "node_modules/magnific-popup/dist/magnific-popup.css", */
            "node_modules/normalize.css/normalize.css",
            /* "node_modules/rateyo/src/jquery.rateyo.css", */
            /* "node_modules/ion-rangeslider/css/ion.rangeSlider.css", */
            /*    "node_modules/@fancyapps/fancybox/dist/jquery.fancybox.css",
               "node_modules/malihu-custom-scrollbar-plugin/jquery.mCustomScrollbar.css",
               "node_modules/fontawesome-pro-5.8.2-web/all.css", */
            "node_modules/wowjs/animate.css",
            /*   "node_modules/paginationjs/dist/pagination.css", */
            /* "node_modules/swiper/swiper.css", */
            /* "node_modules/jquery-form-styler/dist/jquery.formstyler.css",  */
        ])
        .pipe(concat("libs.min.css"))
        .pipe(cssmin())
        .pipe(gulp.dest("app/css"));
});

gulp.task("html", function() {
    return gulp.src("app/*.html").pipe(
        browserSync.reload({
            stream: true,
        })
    );
});
gulp.task("js", function() {
    return gulp.src("app/js/*.js").pipe(
        browserSync.reload({
            stream: true,
        })
    );
});

gulp.task("browser-sync", function() {
    browserSync.init({
        server: {
            baseDir: "app/",
        },
    });
});

gulp.task("watch", function() {
    gulp.watch("app/scss/**/*.scss", gulp.parallel("sass"));
    gulp.watch("app/*.html", gulp.parallel("html"));
    gulp.watch("app/js/*.js", gulp.parallel("js"));
});

gulp.task(
    "default",
    gulp.parallel(
        "style",
        "script",
        "html",
        "js",
        "sass",
        "watch",
        "browser-sync"
    )
);