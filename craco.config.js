const CracoLessPlugin = require(`craco-less`)
const darkTheme = require(`@ant-design/dark-theme`)

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
              ...darkTheme.default,
              '@primary-color': `#49B17E`,
              '@link-color': `#49B17E`,
              '@font-size-base': `16px`,
            },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
}
