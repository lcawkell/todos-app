const path = require('path');
var nodeModulesPath = path.resolve(__dirname, 'node_modules');
var webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
    entry: {
        './App':'./src/App.tsx'
    },
    output: {
        filename: "[name].js",
        path: path.resolve(__dirname, '../JScripts')
    },
    devtool:'source-map',

    resolve: {
        extensions: [".ts", ".tsx", ".js", ".json"]
    },
    plugins: [
        new UglifyJsPlugin({
            sourceMap:true
        })
    ],
    mode:"production",
    module: {
        rules: [
            // TypeScript Loader for TSX files
            {
              'test': /\.tsx?$/,
              'loaders': ['babel-loader','awesome-typescript-loader'],
              'exclude': [/node_modules/,nodeModulesPath]
            },
            // Just a babel loader for JSX Files
            {
              'test': /\.(jsx?)$/,
              'loaders': ['babel'],
              'exclude': [/node_modules/,nodeModulesPath]
            },
            {
            // Style loader for CSS files (splitting into modules)
                test: /\.css$/,
                use: [
                    'style-loader',
                    {
                        loader: 'typings-for-css-modules-loader',
                        options: {
                            modules: true,
                            namedExport: true,
                            localIdentName: '[path][name]__[local]--[hash:base64:5]'
                        }
                    }
                ],
            }                    
        ]
    },

    externals: {
        "react": "React",
        "react-dom": "ReactDOM"
    }
    
}