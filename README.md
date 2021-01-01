# Chat-app

## Roadmap

- [x] [Modern CSS](#modern-css)
  - [x] [Step 1: Convert scss to css](#step-1)
  - [x] [Step 2: Autoprefix](#step-2)
  - [x] [Step 3: Final](#step-3)

## modern-css

### step-1

```bash
yarn add -D node-sass
```
`package.json`
```json
{
  "scripts": {
    "sass:prod": "node_modules/.bin/node-sass scss -o scss/output --output-style compressed --source-map true"
  },
  "devDependencies": {
    "node-sass": "^5.0.0"
  }
}
```
So, we have ability to use scss syntax

### step-2

`./scripts/css-autoprefix.js`
```js
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
```

`package.json`
```json
{
  "scripts": {
    "css-autoprefix": "node ./scripts/css-autoprefix.js"
  },
  "devDependencies": {
    "postcss": "^8.2.2",
    "precss": "^4.0.0"
  }
}
```

### step-3
`package.json`
```json
{
  "scripts": {
    "start": "yarn make-css:prod && node server.js",
    "dev": "yarn make-css:prod && nodemon server.js",
    "make-css:prod": "yarn sass:prod && yarn css-autoprefix"
  }
}
```

A simple secure chatting app, that doesn't require a server. it runs on the [WebSocket protocol](https://en.wikipedia.org/wiki/WebSocket).

## Set it up on your own
- make sure you have Node.js and NPM installed

run ```yarn```

then run ```yarn dev```

in your browser just go to [*http://localhost:5000*](http://localhost:5000*)

## Todo:
* better design
* resolve XSS vulnerability
