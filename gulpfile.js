var gulp       	 = require('gulp'), 
	sass         = require('gulp-sass'), 
	browserSync  = require('browser-sync'), 
	concat       = require('gulp-concat'), 
	uglify       = require('gulp-uglifyjs'), 
	cssnano      = require('gulp-cssnano'), 
	rename       = require('gulp-rename'), 
	del          = require('del'), 
	imagemin     = require('gulp-imagemin'),
	pngquant     = require('imagemin-pngquant'),
	cache        = require('gulp-cache'),
	autoprefixer = require('gulp-autoprefixer');

gulp.task('sass', function(){
	return gulp.src('app/sass/**/*.sass')
		.pipe(sass())
		.pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
		.pipe(gulp.dest('app/css'))
		.pipe(browserSync.reload({stream: true}))
});

gulp.task('browser-sync', function() {
	browserSync({
		server: {
			baseDir: 'app' 
		},
		notify: false 
	});
});

gulp.task('scripts', function() {
	return gulp.src([
		'app/libs/jquery/src/jquery.min.js',
		])
		.pipe(concat('libs.min.js'))
		.pipe(uglify())
		.pipe(gulp.dest('app/js'));
});

gulp.task('css-libs', ['sass'], function() {
	return gulp.src('app/css/libs.css')
		.pipe(cssnano()) 
		.pipe(rename({suffix: '.min'})) 
		.pipe(gulp.dest('app/css')); 
});

gulp.task('watch', ['browser-sync', 'sass'], function() {
	gulp.watch('app/sass/**/*.sass', ['sass']); 
	gulp.watch('app/*.html', browserSync.reload); 
	gulp.watch('app/js/**/*.js', browserSync.reload);
});

gulp.task('clean', function() {
	return del.sync(['src/*', "!src/.git"]);
});

gulp.task('img', function() {
	return gulp.src('app/img/**/*') 
		.pipe(cache(imagemin({
		// .pipe(imagemin({ // Сжатие без кеширования
			interlaced: true,
			progressive: true,
			svgoPlugins: [{removeViewBox: false}],
			use: [pngquant()]
		}))/**/)
		.pipe(gulp.dest('src/img')); 
});

gulp.task('build', ['clean', 'img', 'sass', 'scripts','css-libs'], function() {

	var buildCss = gulp.src([ // Переносим библиотеки в продакшен
		'app/css/main.css',
		'app/css/libs.min.css'
		])
	.pipe(gulp.dest('src/css'))

	var buildJs = gulp.src('app/js/**/*') // Переносим скрипты в продакшен
	.pipe(gulp.dest('src/js'))

	var buildHtml = gulp.src('app/*.html') // Переносим HTML в продакшен
	.pipe(gulp.dest('src'));

	var libMin = gulp.src('app/lib-min/*')
	.pipe(gulp.dest('src/lib-min'));

});

gulp.task('clear', function (callback) {
	return cache.clearAll();
})

gulp.task('default', ['watch']); //Пишем Watch вместо gulp watch