var gulp = require("gulp"),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync').create(),
    notify = require('gulp-notify'),
    gulpImport = require('gulp-html-import'),
    tap = require('gulp-tap'),
    browserify = require('browserify'),
    buffer = require ('gulp-buffer');

//definir tarea por defecto
gulp.task("default", ["html", "sass", "js"], function (){ //Indica que inicialize la tarea '[sass]' y luego la tarea default osea entra ya a la function
    //iniciamos el servidor de desarrollo.. en esa carpeta ANTES 'src/'  AHORA 'dist/'    
    browserSync.init({server: "dist/"});

    //Observa los cambios en los archivos SASS y ejecuta la tarea 'sass'
    gulp.watch(["src/scss/*.scss", "src/scss/**/*.scss"], ["sass"])

    //Observa cambios en los archivos HTML y recarga el navegador
    // gulp.watch("src/*.html").on("change", browserSync.reload); una forma
    //Se usaba reload => function(){ browserSync.reload(); notify().write('Navegador recargado'); })
    gulp.watch(["src/*.html", "src/**/*.html"], ['html']); //Se ejecuta la tarea ['html']

    //observa cambios en los archivos JS y compila el JS de nuevo
    gulp.watch(["src/js/*.js", "src/js/**/*.js" ], ["js"])

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
    .pipe(gulpImport('src/components/')) //en la carptea src/components es donde estaran nuetsros archivos HTML
    .pipe(gulp.dest('dist/')) //esos archivos HTML se dejan en la carpeta 'dist'
    .pipe(browserSync.stream())
    .pipe(notify('HTML importado'));

})

//compilar y generar un único JS
gulp.task('js', function(){
    gulp.src('src/js/main.js')
        .pipe(tap(function(file) { //tap nos permite ejecutar una funcion por cada fichero relacionado en gulp.src
            //reemplazamos el contenido del fichero (main.js) por lo que nos devuelve browserify pasandole el fichero
            file.contents = browserify(file.path) //creamos una instancia de browserify en base al archivo
                            .transform('babelify', {presets : ["es2015"]}) //traduce el codigo de ES6 -> ES5
                            .bundle() //Compilamos  el archivo
                            .on("error", function(error){
                                return notify().write(error);
                            })

        }))
        .pipe(buffer()) //convertimos a buffer para que funcione el sigueinte pipe
        .pipe(gulp.dest("dist/")) //lo guardamos en la carpeta dist
        .pipe(browserSync.stream()) //recargamos el navegador
        .pipe(notify("JS compilado"));
})
