var gulp = require('gulp');
//var plugins = require('gulp-load-plugins')(); Dont need this to just copy files to directory

//ignoring bootstrap and jquery - in attempt at using bootstrap ui for angular
gulp.task('copyCBPcss', function(){
    return gulp.src('./node_modules/cbp-theme/dist/styles/cbp-theme.css')
    .pipe(gulp.dest('./public/styles'));
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



gulp.task('default', ['copyCBPcss','copyCBPjs','copyCBPfonts','copyJquery','copyBootstrap']);