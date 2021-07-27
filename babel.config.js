const presets = [
    [
        "@babel/preset-env",
        {
            useBuiltIns: "entry",
            corejs: {
                version: 3,
                proposals: true
            },
            targets: {
                browsers: ['ie >= 11'],
                node: "14"
            }
        }
    ],
    "@babel/preset-react"
];

const plugins = [
    [
        "module-resolver",
        {
            root: ["src/js"]
        }
    ],
    "@babel/plugin-transform-runtime",
    "@babel/plugin-proposal-object-rest-spread",
    "@babel/plugin-proposal-class-properties",
    "@babel/plugin-proposal-optional-chaining",
    "@babel/plugin-syntax-dynamic-import",
    "react-hot-loader/babel"
];

module.exports = {
    presets,
    plugins
};
