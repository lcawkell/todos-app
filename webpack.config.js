const path = require('path');
var nodeModulesPath = path.resolve(__dirname, 'node_modules');
var webpack = require('webpack');

module.exports = {
    entry: {
        './App':'./src/App.tsx'
    },
    output: {
        filename: "[name].js",
        path: path.resolve(__dirname, 'dist')
    },
    devtool:'source-map',
    resolve: { extensions: [".ts", ".tsx", ".js", ".json"] },
    mode:'development',
    module: {
        rules: [
            // TypeScript Loader for TSX files
            {
                test: /\.tsx?$/,
                loaders: ['babel-loader','ts-loader'],
                exclude: [/node_modules/,nodeModulesPath]
            },
            // Just a babel loader for JSX Files
            {
                test: /\.(jsx?)$/,
                loaders: ['babel'],
                exclude: [/node_modules/,nodeModulesPath]
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
                            localIdentName: '[name]__[local]--[hash:base64:5]'
                        }
                    }
                ],
            }              
        ]
    },

    externals: {
        "react": "React",
        "react-dom": "ReactDOM"
    },

    watch: false,

    devServer: {
        contentBase: path.join(__dirname, "dist"),
        watchContentBase: true,
        compress: true,
        port: 9000
      }
    
}