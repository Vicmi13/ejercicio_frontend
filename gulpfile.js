var gulp = require("gulp"),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync').create(),
    notify = require('gulp-notify'),
    gulpImport = require('gulp-html-import');

//definir tarea por defecto
gulp.task("default", ["html", "sass"], function (){ //Indica que inicialize la tarea '[sass]' y luego la tarea default osea entra ya a la function
    //iniciamos el servidor de desarrollo.. en esa carpeta ANTES 'src/'  AHORA 'dist/'    
    browserSync.init({server: "dist/"});

    //Observa los cambios en los archivos SASS y ejecuta la tarea 'sass'
    gulp.watch(["src/scss/*.scss", "src/scss/**/*.scss"], ["sass"])

    //Observa cambios en los archivos HTML y recarga el navegador
    // gulp.watch("src/*.html").on("change", browserSync.reload); una forma
    //Se usaba reload => function(){ browserSync.reload(); notify().write('Navegador recargado'); })
    gulp.watch("src/*.html", ['html']); //Se ejecuta la tarea 'html'

})

//compiar SASS.
gulp.task('sass', function (){
    gulp.src("src/scss/style.scss") //cargamos el archivo style.scss
        
        .pipe(sass().on('error', function(error){
            return notify().write(error); //Si ocurre un error, se muestra una notificación
        })) //lo compilamos con gulp-sass

        .pipe(gulp.dest("dist/")) //guardamos el resultado en la carpeta css
        .pipe(browserSync.stream()) //recarga el CSS del navegador 
        .pipe(notify('SASS compilado')) //Muestra modificación en pantalla
})

//COpiar e importar HTML
gulp.task('html', function(){
    gulp.src('src/*.html')
    .pipe(gulpImport('src/components')) //en la carptea src/components es donde estaran nuetsros archivos HTML
    .pipe(gulp.dest('dist/')) //esos archivos HTML se dejan en la carpeta 'dist'
    .pipe(browserSync.stream())
    .pipe(notify('HTML compilado'));

})

//Construir los archivos que se generaran en el servidor de producción (archivo CSS, JS, HTML ) finales
//gulp.task('build', function(){

//})
