var gulp = require("gulp"),
    sass = require('gulp-sass');

//definir tarea por defecto
gulp.task("default", function (){
    
    //Observa los cambios en los archivos SASS y ejecuta la tarea 'sass'
    gulp.watch(["src/scss/*.scss", "src/scss/**/*.scss"], ["sass"])
})

//compiar SASS.
gulp.task('sass', function (){
    gulp.src("src/scss/style.scss") //cargamos el archivo style.scss
        .pipe(sass().on('error',sass.logError)) //lo compilamos con gulp-sass
        .pipe(gulp.dest("src/css/")); //guardamos el resultado en la carpeta css
})

gulp.watch()