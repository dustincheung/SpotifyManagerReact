const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    ["/api/*", "/login"],			//requests to these routes will automatically redirect to express 5000 server
    createProxyMiddleware({
      target: "http://localhost:5000",
    })
  );
};