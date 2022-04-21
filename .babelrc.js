const env = process.env.BABEL_ENV || process.env.NODE_ENV;
const isDev = env === "development";
const isProd = env === "production";
const isTest = env === "test";

let presets = [
  "next/babel",
  [
    "@babel/preset-react",
    {
      runtime: "automatic",
      importSource: "@emotion/react",
    },
  ],
];
let plugins = [
  "transform-export-default-name",
  [
    "emotion",
    {
      sourceMap: isDev,
      autoLabel: true,
      labelFormat: "[dirname]--[local]",
    },
  ],
  [
    "babel-plugin-root-import",
    {
      rootPathSuffix: "./",
      rootPathPrefix: "/",
    },
  ],
  "@babel/plugin-transform-runtime",
];

if (isDev) {
  plugins.push([
    "console-source",
    {
      fullPath: true,
    },
  ]);
}

if (isProd) {
  plugins.push(["lodash", { id: ["lodash", "recompose"] }]);
  // Disabled because of a bug.
  // @see https://github.com/zeit/next.js/issues/4227
  // // babel-plugin-direct-import: cherry-picks imports of es6 modules.
  // plugins.push([
  //   'direct-import',
  //   [
  //     '@appbaseio/reactivesearch',
  //     {
  //       name: '@appbaseio/reactivesearch',
  //       indexFile: '@appbaseio/reactivesearch/lib/index.es.js',
  //     },
  //   ],
  // ])
}

if (isTest) {
  // presets = [
  //   [
  //     '@babel/preset-env',
  //     {
  //       targets: {
  //         node: 'current',
  //       },
  //     },
  //   ],
  //   ['@babel/preset-stage-0', { decoratorsLegacy: true }],
  //   '@babel/preset-react',
  // ]

  // presets = [['next/babel', { 'preset-env': { modules: 'commonjs' } }]]

  plugins = [
    ...plugins,
    "import-graphql",
    [
      "module-resolver",
      {
        alias: {
          "next/config": "./.mocks/next-config.js",
        },
      },
    ],
  ];
}

module.exports = { presets, plugins };
