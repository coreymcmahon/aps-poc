
var gulp = require('gulp'),
    browserify = require('browserify'),
    reactify = require('reactify'),
    source = require('vinyl-source-stream'),
    gutil = require('gulp-util'),
    watch = require('gulp-watch');

gulp.task('watch', function () {
    watch("public/assets/src/**/*.js", { readDelay: 250 }, function () {
        gulp.run('build');
    });
});

gulp.task('build', function () {
    var src  = './public/assets/src/js',
        dest = './public/assets/dist/js';

    var bundle = browserify()
        .add([src, 'app.js'].join('/'))
        .transform(reactify)
        .bundle()
        .on('error', function(e) {
            gutil.log('Browserify Error', e);
        })
        .pipe(source('bundle.js'))
        .pipe(gulp.dest(dest));
});

gulp.task('default', ['build']);