const express = require("express");

function keepAlive() {
  const app = express();
  app.get("/", (req, res) => res.send("✅ البوت يعمل!"));
  app.listen(3000, () => {
    console.log("🚀 Keep-alive server يعمل على المنفذ 3000");
  });
}

module.exports = keepAlive;
