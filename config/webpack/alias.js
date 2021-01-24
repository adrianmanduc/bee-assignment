const path = require('path');

function resolve(_path) {
  return path.join(path.resolve(process.cwd(), _path));
}

module.exports = {
  '/': resolve('/'),
  assets: resolve('./src/assets'),
  common: resolve('./src/common'),
  context: resolve('src/context'),
  components: resolve('./src/components'),
  constants: resolve('./src/constants'),
  hooks: resolve('./src/hooks'),
  pages: resolve('./src/pages'),
  styles: resolve('./src/styles'),
  services: resolve('./src/services'),
  utils: resolve('./src/common/utils')
};
