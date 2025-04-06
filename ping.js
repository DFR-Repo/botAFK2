const https = require("https");

https.get("https://your-railway-app-url.up.railway.app/", (res) => {
  console.log(`📡 Ping sent: ${res.statusCode}`);
}).on("error", (e) => {
  console.error(`❌ Ping error: ${e.message}`);
});
