var gulp = require('gulp');
var pug = require('gulp-pug');
var stylus = require('gulp-stylus');
var nib = require('nib');
var rupture = require('rupture');
var imagemin = require('gulp-imagemin');
var concat = require('gulp-concat');
var changed = require('gulp-changed');
var browsersync = require('browser-sync');

var dev_path = {
	styl: 'stylus/',
	pug: 'pug/',
	js: 'js/',
	img: 'img/'
}

var public_path = {
	css: '../public_html/css',
	html: '../public_html/',
	js: '../public_html/js/',
	img: '../public_html/img/'
}

//Compilar pug
gulp.task('pug', function(){
	gulp.src([
			dev_path.pug + 'index.pug'
		])
	.pipe(pug({pretty: true}))
	.on('error', console.log)
	.pipe(gulp.dest(public_path.html))
	.pipe(browsersync.reload({stream:true}));
});

//Complar stylus
gulp.task('stylus', function(){
	gulp.src([
			dev_path.styl + 'style.styl'
		])
	.pipe(stylus({
			use: [nib(), rupture()],
			compress: false
		}))
	.on('error', console.log)
	.pipe(gulp.dest(public_path.css))
	.pipe(browsersync.reload({stream:true}));
});

gulp.task('concat', function(){
	gulp.src(['js/vendor/jquery.flexslider-min.js'])
	.pipe(concat('main.js'))
	.on('error', console.log)
	.pipe(gulp.dest(public_path.js))
	.pipe(browsersync.reload({stream:true}));
});

gulp.task('images', function(){
    gulp.src([dev_path.img + '**/*'])
        .pipe(changed(public_path.img))
        .pipe(imagemin({ progressive: true }))
        .pipe(gulp.dest(public_path.img))
        .pipe(browsersync.reload({stream: true}));
});

gulp.task('browsersync-server', function(){
	browsersync.init(null,{
			server: {baseDir: '../public_html'},
			open: true,
			notify: false
		});
});

gulp.task('watch', function(){
	gulp.watch(dev_path.pug + '**/*.pug', ['pug']);
	gulp.watch(dev_path.styl + '**/*.styl', ['stylus']);
	gulp.watch(dev_path.js + '**/*.js', ['concat']);
	gulp.watch(dev_path.img + '**/*', ['images']);
});

gulp.task('default',[
	'pug',
	'stylus',
	'images',
	'concat',
	'browsersync-server',
	'watch'
]);