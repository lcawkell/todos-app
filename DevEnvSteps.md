# Steps for Dev Environment
## Inital Setup
### GIT
```bash
git init
touch .gitignore
touch readme.md
git add readme.md .gitignore
git commit -m "initial commit"
git remote add origin [url]
git push --set-upstream origin master
echo "node_modules" >> .gitignore
```

### NPM

```bash
npm init
mkdir -p src/components dist
touch index.html dist/index.html src/app.tsx src/components/Todos.tsx
```
#### Dependancies ####
##### Regular
1. React / ReactDOM (react react-dom)
2. Babel Polyfill (babel-polyfill)
##### Dev
1. TypeScript (typescript awesome-typescript-loader ts-loader)
2. Webpack (webpack webpack-cli)
3. Webpack Dev Server (webpack-dev-server)
4. Jest (jest ts-jest enzyme enzyme-adaptor-react-16 react-test-renderer jest-css-modules)
5. Babel (babel-core babel-loader babel-preset-env babel-preset-es2015-ie)
6. Css Loaders (css-loader style-loader source-map-loader uglifyjs-webpack-plugin)
##### Types
1. @types/react @types/react-dom
2. @types/jest @types/enzyme @types/enzyme-adapter-react-16
```bash
npm install --save react react-dom babel-polyfill
npm install --save-dev @types/react @types/react-dom @types/jest @types/enzyme @types/enzyme-adapter-react-16 typescript webpack webpack-dev-server jest ts-jest enzyme enzyme-adapter-react-16 babel-core babel-loader babel-preset-env css-loader style-loader awesome-typescript-loader ts-loader webpack-cli react-test-renderer source-map-loader uglifyjs-webpack-plugin jest-css-modules
```
#### NPM Scripts ####

```json
"start": "webpack-dev-server",
"release": "webpack --config webpack.prod.js"
```
#### JEST Testing ####
```json
"jest": {
    "transform": {
      ".(ts|tsx)": "<rootDir>/node_modules/ts-jest/preprocessor.js"
    },
    "testRegex": "(/__tests__/.*|\\.(test|spec))\\.(ts|tsx|js)$",
    "moduleFileExtensions": [
      "ts",
      "tsx",
      "js"
    ],
    "testPathIgnorePatterns": [
      "/node_modules/",
      "/.git/"
    ],
    "moduleNameMapper": {
      "\\.(css|less)$": "<rootDir>/__mocks__/styleMock.js"
    }
  }
```
### Webpack
This setup will be simplified
```bash
touch webpack.config.js webpack.prod.js
```
#### Webpack Dev
```javascript
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
```
#### Webpack Prod
```javascript
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
```
### React
#### app.tsx
```typescript
import * as React from 'react';
import * as ReactDOM from 'react-dom';

import Todos from './components/Todos';

ReactDOM.render(
    <Todos />,
    document.getElementById('app')
)
```
### TypeScript ###
#### tsconfig.json ####
```bash
touch tsconfig.json
```
```json
{
    "compilerOptions": {
        "outDir": "./dist./",
        "sourceMap": true,
        "noImplicitAny": false,
        "module": "commonjs",
        "target": "es6",
        "jsx": "react",
        "experimentalDecorators": true,
        "strictNullChecks": false,
        "moduleResolution": "node",
        "rootDir": "src"
    },
    "include": [
        "./src/components/**/*"
    ],
    "awesomeTypescriptLoaderOptions": {
      "reportFiles": [
        "./src/components/**/*"
      ],
      "useBabel": true,
      "strictNullChecks": false,
      "noImplicitAny": false
    }
}
```
### HTML File ###
An initial HTML file to view our app
```html
<div id="app"></div>
<script src="https://unpkg.com/react@16/umd/react.production.min.js"></script>
<script src="https://unpkg.com/react-dom@16/umd/react-dom.production.min.js"></script>

<script src="App.js"></script>
```