var gulp = require('gulp');
//var plugins = require('gulp-load-plugins')(); Dont need this to just copy files to directory

var sass = require('gulp-sass');

//ignoring bootstrap and jquery - in attempt at using bootstrap ui for angular
gulp.task('copyCBPcss', function(){
    return gulp.src('./node_modules/cbp-theme/dist/styles/cbp-theme.css')
    .pipe(gulp.dest('./public/styles'));
});
//process my custom sass file
gulp.task('customStyle', function(){
    gulp.src('./public/styles/sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./public/styles'))
});

gulp.task('copyCBPjs', function(){
    return gulp.src('./node_modules/cbp-theme/dist/js/cbp-theme.js')
    .pipe(gulp.dest('./public/js'));
});

gulp.task('copyCBPfonts', function(){
    return gulp.src('./node_modules/cbp-theme/dist/fonts/**/*.{ttf,woff,eof,svg}')
    .pipe(gulp.dest('./public/fonts'));
});

gulp.task('copyJquery', function(){
    return gulp.src('./node_modules/cbp-theme/dist/js/jquery.js')
    .pipe(gulp.dest('./public/js'));
});

gulp.task('copyBootstrap', function(){
    return gulp.src('./node_modules/cbp-theme/dist/js/bootstrap.js')
    .pipe(gulp.dest('./public/js'));
});

gulp.task('copyJqueryInputMask', function(){
    return gulp.src('./node_modules/cbp-theme/dist/js/jquery.inputmask.bundle.js')
    .pipe(gulp.dest('./public/js'));
});

gulp.task('copyAnimate1', function(){
    return gulp.src('./node_modules/animate.css/source/sliding_entrances/slideInLeft.css')
    .pipe(gulp.dest('./public/styles'));
});

gulp.task('copyAnimate', function(){
    return gulp.src('./node_modules/animate.css/source/sliding_exits/slideOutRight.css')
    .pipe(gulp.dest('./public/styles'));
});


gulp.task('default', ['copyCBPcss','copyCBPjs','copyCBPfonts','copyJquery','copyBootstrap','customStyle']);