const $ = require('./gulpfile.json')
const gulp = require('gulp')
const plugins = require('gulp-load-plugins')(gulp)
const tsconfig = require('./tsconfig.json')
const typescript = require('gulp-typescript')

const config = () => {
  const bundle = { bundle: require('./dist/bundle.result.json') }
  const pkg = { package: require('./package.json') }
  return Object.assign({}, $, { tsconfig }, pkg, bundle)
}

gulp.task('build:bundle', ['build:scss', 'build:ts'], () => {
  return gulp.src('./bundle.config.js')
    .pipe(plugins.debug({ title: 'bundle' }))
    .pipe(plugins.bundleAssets())
    .pipe(plugins.bundleAssets.results($.target.dest))
    .pipe(gulp.dest($.target.dest))
})

gulp.task('build:html', ['build:bundle'], () => {
  return gulp.src($.source.html)
    .pipe(plugins.debug({ title: '.html' }))
    .pipe(plugins.mustache(config()))
    .pipe(gulp.dest($.target.dest))
})

gulp.task('build:manifest', ['build:bundle'], () => {
  return gulp.src($.source.manifest)
    .pipe(plugins.debug({ title: 'manifest.json' }))
    .pipe(plugins.mustache(config()))
    .pipe(plugins.rename('manifest.json'))
    .pipe(gulp.dest($.target.dest))
})

gulp.task('build:png', () => {
  return gulp.src($.source.png)
    .pipe(plugins.debug({ debug: '.png' }))
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
    .pipe(typescript())
    .pipe(gulp.dest($.target.dest))
})

gulp.task('build', [
  'build:bundle',
  'build:html',
  'build:manifest',
  'build:png',
  'build:scss',
  'build:ts'
])
