var gulp = require("gulp"),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync').create(),
    notify = require('gulp-notify'),
    gulpImport = require('gulp-html-import'),
    tap = require('gulp-tap'),
    browserify = require('browserify'),
    buffer = require ('gulp-buffer'),
    sourcemaps = require('gulp-sourcemaps'),
    htmlmin = require("gulp-htmlmin"),
    uglify = require ('gulp-uglify'),
    postcss = require ('gulp-postcss'),
    autoprefixer = require ('autoprefixer'),
    cssnano = require('cssnano'),
    imagemin = require('gulp-imagemin'),
    responsive = require('gulp-responsive');


//definir tarea por defecto
gulp.task("default", ["img", "html", "sass", "js"], function (){ //Indica que inicialize la tarea '[sass]' y luego la tarea default osea entra ya a la function

    //iniciamos el servidor de desarrollo.. en esa carpeta ANTES 'src/'  AHORA 'dist/' 
    //CLASE 7 como ya  se esta utilizando el servidor de json-server se tiene que cambiar 'browserSync a proxxy  y ahi poner la url del servidor donde esta corriendo' 
    //browserSync.init({server: "dist/"});
    browserSync.init({proxy: "http://127.0.0.1:3100/"});

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
        // ====SE AGREGAN SOURCE MAPS PARA SASS CLASE 6====
        .pipe(sourcemaps.init()) //Comienza a capturar los  sourcemaps
        .pipe(sass().on('error', function(error){
            return notify().write(error); //Si ocurre un error, se muestra una notificación
        })) //lo compilamos con gulp-sass
        .pipe(postcss([
            autoprefixer(), //Transforma el CSS dandole compatibilidad a versiones antiguas 
            cssnano() //Comprime o minifica el CSS
        ]))
        .pipe(sourcemaps.write('./')) //genera el sourcemap en la misma carpeta que el CSS 
        .pipe(gulp.dest("dist/")) //guardamos el resultado en la carpeta css
        .pipe(browserSync.stream()) //recarga el CSS del navegador 
        .pipe(notify('SASS compilado')) //Muestra modificación en pantalla
})

//COpiar e importar HTML
gulp.task('html', function(){
    gulp.src('src/*.html')
    .pipe(gulpImport('src/components/')) //en la carptea src/components es donde estaran nuetsros archivos HTML. Reemplaza los @import de los <HTML></HTML>
    .pipe(htmlmin({collapseWhitespace: true})) //Minifica el HTML 
    .pipe(gulp.dest('dist/')) //esos archivos HTML se dejan en la carpeta 'dist'
    .pipe(browserSync.stream())
    .pipe(notify('HTML importado'));

})

//compilar y generar un único JS
gulp.task('js', function(){
    gulp.src('src/js/main.js')
        .pipe(tap(function(file) { //tap nos permite ejecutar una funcion por cada fichero relacionado en gulp.src
            //reemplazamos el contenido del fichero (main.js) por lo que nos devuelve browserify pasandole el fichero
            file.contents = browserify(file.path, {debug: true}) //creamos una instancia de browserify en base al archivo
                            .transform('babelify', {presets : ["es2015"]}) //traduce el codigo de ES6 -> ES5
                            .bundle() //Compilamos  el archivo
                            .on("error", function(error){
                                return notify().write(error);
                            })

        }))
        .pipe(buffer()) //convertimos a buffer para que funcione el sigueinte pipe
        .pipe(sourcemaps.init({loadMaps: true})) //captura los source maps del fichero de origen
        .pipe(uglify()) //Minificamos el JS
        .pipe(sourcemaps.write('./')) //y los guarda en el mismo directorio que el archivo fuente
        .pipe(gulp.dest("dist/")) //lo guardamos en la carpeta dist
        .pipe(browserSync.stream()) //recargamos el navegador
        .pipe(notify("JS compilado"));
})

//tarea que optimiza y crea las imágenes responsive
gulp.task('img', function(){
    gulp.src('src/img/*')
    .pipe(responsive({ //generamos las versiones responsive
        '*.png':[
            { width: 150, rename: {suffix: "-150px"}},
            { width: 250, rename: {suffix: "-250px"}},
            { width: 300, rename: {suffix: "-300px"}}
        ]
    })) 
    .pipe(imagemin()) //optimizamos  el paso de las imagenes
    .pipe(gulp.dest('dist/img/'))
})