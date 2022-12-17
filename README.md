# Webpack Spawn Plugin

A webpack plugin that runs `child_process.spawn` within compilation.

## Install

### NPM
```sh
npm install --save-dev @davidsemakula/webpack-spawn-plugin
```

### Yarn
```sh
yarn add --dev @davidsemakula/webpack-spawn-plugin
```

## Usage

```js
import SpawnPlugin from '@davidsemakula/webpack-spawn-plugin'

const config = {
  ...
  plugins: [
    new SpawnPlugin('node', ['.'], options)
  ]
}
```

### Options

> `when` (default: "done")

The [Webpack compiler hook](https://webpack.js.org/api/compiler-hooks/#hooks)
during which the process will be spawned.

> `stdio` (default: "inherit")

The output stream to which stdout and stderr will be sent.

> `persistent` (default: false)

Indicates whether the spawned process should be replaced
every time the hook is called.
