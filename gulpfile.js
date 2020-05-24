const gulp = require('gulp');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify-es').default;
const browserSync = require('browser-sync')


gulp.task('browserSync', function(){
    browserSync({
        server:{
            baseDir: "../portfolio_engenheira_civil/"
            
        },
        options:{
            reloadDelay:250
        },
        notify: false
    });

    // gulp.watch('./js/_js/**/*.js').on('change',browserSync.reload)
    // gulp.watch('./css/_scss/**/*.scss').on('change',browserSync.reload);
    // gulp.watch("./*.html").on('change',browserSync.reload);

})




sass.compiler = require('node-sass');

gulp.task('sass', () => {
      return gulp.src('./css/_scss/**/*.scss')
      .pipe(concat('style.min.css'))
      .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
      .pipe(gulp.dest('./css'))
      .pipe(browserSync.reload({stream:true}))

   });

   gulp.task('js',() =>{
       return gulp.src('./js/_js/**/*.js')
       .pipe(concat('js.min.js'))
       .pipe(uglify())
       .pipe(gulp.dest('./js'))
       .pipe(browserSync.reload({stream:true}));
   });

  

   





    gulp.task('default',gulp.parallel('browserSync','sass','js',function(done){
        
        gulp.watch('./js/_js/**/*.js', gulp.series('js'));
        gulp.watch('./css/_scss/**/*.scss',gulp.series('sass'));
        gulp.watch("./*.html").on('change',browserSync.reload);

        done();
    })


   );