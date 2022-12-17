// Inspired by: https://github.com/diegohaz/webpack-spawn-plugin/blob/v0.3.0/src/index.js

const spawn = require('cross-spawn');
const fkill = require('fkill');
const _ = require('lodash');

function SpawnPlugin(command, args, options) {
  self.when = options.when || 'done';
  self.persistent = options.persistent || false;
  self.args = [
    command,
    args,
    {
      stdio: options.stdio || 'inherit',
      ..._.omit(options || {}, ['when', 'stdio', 'persistent']),
    },
  ];
}

const self = SpawnPlugin.prototype;

SpawnPlugin.prototype.apply = function(compiler) {
  compiler.hooks[self.when].tapAsync('SpawnPlugin', function(
    compilation,
    callback
  ) {
    let promise = Promise.resolve();
    if (self.pid) {
      if (!self.persistent) {
        promise = fkill(self.pid, { force: true });
      }
    }
    const performSpawn = () => {
      const server = spawn(...self.args);
      self.pid = server.pid;
      if (callback) callback();
    };
    promise.then(performSpawn).catch(performSpawn);
  });
};

module.exports = SpawnPlugin;
