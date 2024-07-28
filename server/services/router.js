const { Express } = require("express");

/**
 * @param {Express} app
 */
module.exports = routerConfig = (app) => {
  app.get("/", (req, res) => {
    res.send("Hello world");
  });
};
