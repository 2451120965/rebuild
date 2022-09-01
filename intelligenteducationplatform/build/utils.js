module.exports = {
  wrapperEnv: function (envConf) {
    const ret = {};
    for (const envName of Object.keys(envConf)) {
      let realName = envConf[envName].replace(/\\n/g, '\n');
      realName = realName === 'true' ? true : realName === 'false' ? false : realName;

      if (envName === 'PORT_DEF') {
        realName = Number(realName);
      }
      if (envName === 'PROXY_DEF' && realName) {
        try {
          realName = JSON.parse(realName.replace(/'/g, '"'));
        } catch (error) {
          realName = '';
        }
      }
      ret[envName] = realName;
      if (typeof realName === 'string') {
        process.env[envName] = realName;
      } else if (typeof realName === 'object') {
        process.env[envName] = JSON.stringify(realName);
      }
    }
    return ret;
  },
  createProxy: function (list = []) {
    const ret = {};
    for (const [prefix, target, pathRewrite] of list) {
      ret[prefix] = {
        target,
        changeOrigin: true,
        ws: true,
        logLevel: "debug",
        pathRewrite
      };
    }
    return ret;
  }
}