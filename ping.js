const https = require("https");

https.get("https://test-production-93f1.up.railway.app/", (res) => {
  console.log(`📡 Ping sent: ${res.statusCode}`);
}).on("error", (e) => {
  console.error(`❌ Ping error: ${e.message}`);
});
