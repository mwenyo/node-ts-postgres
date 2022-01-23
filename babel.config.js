module.exports = {
  plugins: [
    "babel-plugin-transform-typescript-metadata",
    ['module-resolver', {
      alias: {
        '@controllers': './src/controllers',
        '@middlewares': './src/middlewares',
        '@services': './src/services',
        '@repositories': './src/repositories',
        '@entities': './src/entities',
      }
    }],
    ["@babel/plugin-proposal-decorators", { "legacy": true }],
    ["@babel/plugin-proposal-class-properties", { 'loose': true }],
    ["@babel/plugin-proposal-private-methods", { 'loose': true }],
    ['@babel/plugin-proposal-private-property-in-object', { loose: true }]
  ],
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current',
        },
        loose: true
      }
    ],
    '@babel/preset-typescript'
  ],
  ignore: [
    '**/*.spec.ts'
  ]
}
