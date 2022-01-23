module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current'
        }
      }
    ],
    '@babel/preset-typescript'
  ],
  plugins: [
    ['module-resolver', {
      alias: {
        '@models': './src/models',
        '@controllers': './src/controllers',
        '@middlewares': './src/middlewares',
        '@services': './src/services'
      }
    }],
    ["@babel/plugin-proposal-decorators", { "legacy": true }]
  ],
  ignore: [
    '**/*.spec.ts'
  ]
}
