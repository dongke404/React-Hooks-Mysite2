const { override, fixBabelImports, addLessLoader,addWebpackExternals } = require('customize-cra');
module.exports = override(
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: true,
  }),
  addLessLoader({
      javascriptEnabled: true,
      modifyVars: { '@primary-color': '#61dafb' },
    }),
  addWebpackExternals({
      react:"React",
      reactDom:"ReactDom",
  }),
);