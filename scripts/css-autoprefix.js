const autoprefixer = require('autoprefixer')
const postcss = require('postcss')
const precss = require('precss')
const fs = require('fs')

const srcDir = 'scss/output'
const outputDir = 'public/css'
const getPath = (dir, filename) => `${dir}/${filename}`

function makeCSS(filename) {
  fs.readFile(`${srcDir}/${filename}`, (err, css) => {
    postcss([precss, autoprefixer])
      .process(css, { from: getPath(srcDir, filename), to: getPath(outputDir, filename) })
      .then(result => {
        fs.writeFile(getPath(outputDir, filename), result.css, () => true)
        if (result.map) {
          fs.writeFile(getPath(outputDir, `${filename}.map`), result.map, () => true)
        }
      })
  })
}

fs.readdir(srcDir, (err, files) => {
  files.forEach(filename => {
    if (!filename.match(/.map/g) && filename !== '.gitkeep') {
      makeCSS(filename)
    }
  });
});
