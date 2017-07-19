var gulp = require("gulp"),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync').create(),
    notify = require('gulp-notify');

//definir tarea por defecto
gulp.task("default", function (){
    //iniciamos el servidor de desarrollo.. en esa carpeta 'src/'    
    browserSync.init({server: "src/"});

    //Observa los cambios en los archivos SASS y ejecuta la tarea 'sass'
    gulp.watch(["src/scss/*.scss", "src/scss/**/*.scss"], ["sass"])

    //Observa cambios en los archivos HTML
    // gulp.watch("src/*.html").on("change", browserSync.reload); una forma
    gulp.watch("src/*.html", function(){
        browserSync.reload();
        notify().write('Navegador recargado');
    })


//compiar SASS.
gulp.task('sass', function (){
    gulp.src("src/scss/style.scss") //cargamos el archivo style.scss
        
        .pipe(sass().on('error', function(error){
            return notify().write(error); //Si ocurre un error, se muestra una notificación
        })) //lo compilamos con gulp-sass

        .pipe(gulp.dest("src/css/")) //guardamos el resultado en la carpeta css
        .pipe(browserSync.stream()) //recarga el CSS del navegador 
        .pipe(notify('SASS compilado')) //Muestra modificación en pantalla
})


