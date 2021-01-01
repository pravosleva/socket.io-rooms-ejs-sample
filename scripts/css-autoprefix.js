const autoprefixer = require('autoprefixer')
const postcss = require('postcss')
const precss = require('precss')
const fs = require('fs')

const srcDir = 'scss/output'
const outputDir = 'public/css'

function makeCSS(filename) {
  fs.readFile(`${srcDir}/${filename}`, (err, css) => {
    postcss([precss, autoprefixer])
      .process(css, { from: `${srcDir}/${filename}`, to: `${outputDir}/${filename}` })
      .then(result => {
        fs.writeFile(`${outputDir}/${filename}`, result.css, () => true)
        if (result.map) {
          fs.writeFile(`${outputDir}/${filename}.map`, result.map, () => true)
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
