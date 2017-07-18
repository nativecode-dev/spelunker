const $ = require('./gulpfile.json')
const gulp = require('gulp')
const plugins = require('gulp-load-plugins')(gulp)
const tsconfig = require('./tsconfig.json')
const typescript = require('gulp-typescript')

const config = () => {
  const config = Object.assign({}, $)
  const pkg = require('./package.json')
  const args = [
    { tsconfig },
    { package: pkg }
  ]
  return Object.assign(config, ...args)
}

gulp.task('build:html', () => {
  return gulp.src($.source.html)
    .pipe(plugins.debug({ title: '.html' }))
    .pipe(plugins.mustache(config()))
    .pipe(gulp.dest($.target.dest))
})

gulp.task('build:manifest', () => {
  return gulp.src($.source.manifest)
    .pipe(plugins.debug({ title: 'manifest.json' }))
    .pipe(plugins.mustache(config()))
    .pipe(plugins.rename('manifest.json'))
    .pipe(gulp.dest($.target.dest))
})

gulp.task('build:png', () => {
  return gulp.src($.source.png)
    .pipe(plugins.debug({ title: '.png' }))
    .pipe(gulp.dest($.target.dest))
})

gulp.task('build:scss', () => {
  return gulp.src($.source.scss)
    .pipe(plugins.debug({ title: '.scss' }))
    .pipe(plugins.sass())
    .pipe(gulp.dest($.target.dest))
})

gulp.task('build:ts', () => {
  return gulp.src($.source.ts)
    .pipe(plugins.debug({ title: '.ts' }))
    .pipe(typescript(tsconfig.compilerOptions))
    .pipe(gulp.dest($.target.dest))
})

gulp.task('build:browserify', ['build:html', 'build:manifest', 'build:png', 'build:scss', 'build:ts'], () => {
  return gulp.src($.target.js)
    .pipe(plugins.debug({ title: 'browserify' }))
    .pipe(plugins.browserify())
    .pipe(gulp.dest($.target.dest))
})

gulp.task('build', ['build:browserify'])
