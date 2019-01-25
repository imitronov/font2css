"use strict";

const gulp     = require("gulp");
const concat   = require("gulp-concat");
const font2css = require("gulp-font2css").default;

const arg = (argList => {

  let arg = {}, a, opt, thisOpt, curOpt;
  for (a = 0; a < argList.length; a++) {

    thisOpt = argList[a].trim();
    opt = thisOpt.replace(/^\-+/, '');

    if (opt === thisOpt) {

      // argument value
      if (curOpt) arg[curOpt] = opt;
      curOpt = null;

    }
    else {

      // argument name
      curOpt = opt;
      arg[curOpt] = true;

    }

  }

  return arg;

})(process.argv);

var fontName = arg.name;

function woff() {
	return gulp
		.src( "./font/" + fontName + "/*.woff" )
		.pipe( font2css() )
		.pipe( concat(fontName + ".woff.css") )
		.pipe( gulp.dest( "./css/" ) )
}

function woff2() {
	return gulp
		.src( "./font/" + fontName + "/*.woff2" )
		.pipe( font2css() )
		.pipe( concat( fontName + ".woff2.css") )
		.pipe( gulp.dest( "./css/" ) )
}

gulp.task("default", gulp.parallel(woff, woff2));