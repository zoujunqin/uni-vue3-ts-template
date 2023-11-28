const tailwindcss = require('tailwindcss')
const autoprefixer = require("autoprefixer");
const postcssImportPlugin = require('postcss-import')
const cssnanoPlugin = require("cssnano");
const pxtransformPlugin = require('postcss-pxtransform')

const platformMap = new Map()
platformMap.set(/^mp-/g, 'weapp')
platformMap.set(/^h5-/g, 'h5')
platformMap.set(/^app-/g, 'rn')

const plugins = [
  postcssImportPlugin(),
  tailwindcss(),
  autoprefixer(),
  pxtransformPlugin({ platform:  platformMap.get([...platformMap.keys()].find(key => key.test(process.env.UNI_PLATFORM))), designWidth: 375 }),
  require('weapp-tailwindcss/css-macro/postcss')
]

if (process.env.NODE_ENV === 'production') {
  plugins.push(cssnanoPlugin())
}

module.exports = {
  plugins
}
