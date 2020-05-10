const gulp = require('gulp');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
let uglify = require('gulp-uglify-es').default;
const watch = require('gulp-watch');
const gls =require('gulp-live-server');


sass.compiler = require('node-sass');




gulp.task('sass', () => {
      return gulp.src('./css/_scss/**/*.scss')
      .pipe(concat('style.min.css'))
      .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
      .pipe(gulp.dest('./css'));
   });

   gulp.task('js',() =>{
       return gulp.src('./js/_js/**/*.js')
       .pipe(concat('js.min.js'))
       .pipe(uglify())
       .pipe(gulp.dest('./js'));
   });

   gulp.task('watch',() =>{
       gulp.watch('./js/_js/**/*.js'.gulp.series('js'))
       gulp.watch('/css/_scss/**/*.scss'.gulp.series('sass'))
       
   });

   gulp.task('serve',()=>{
       var server = gls.static('./',8000);
       server.start();
       gulp.watch('./css/**/*.css', function(file){
        gls.notify.apply(server,[file]);
    });

    gulp.watch('./js/**/*.js', function(file){
        gls.notify.apply(server,[file]);
    });

    gulp.watch('./index.html', function(file){
        gls.notify.apply(server,[file]);
    });

   })





   gulp.task('default',gulp.series('sass','js','serve','watch'));