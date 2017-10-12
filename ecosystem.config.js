module.exports = {
  /**
   * Application configuration section
   * http://pm2.keymetrics.io/docs/usage/application-declaration/
   */
  apps : [
    {
      watch: ["server/dist", "./_server.js"],
      watch_options: {
        followSymlinks: false
      },
      name      : 'API',
      script    : './_server.js',
      env: {
        "NODE_ENV": "development",
      },
      env_production : {
        "NODE_ENV": "production"
      }
    }
  ]
};
