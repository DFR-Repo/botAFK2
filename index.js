const mineflayer = require("mineflayer");
const { pathfinder, Movements, goals } = require("mineflayer-pathfinder");
const keep_alive = require("./keep_alive");

function createBot() {
  const bot = mineflayer.createBot({
    host: "DreamskySr.aternos.me", // عنوان السيرفر
    port: 13978,                   // البورت
    username: "BOT_ABDALLA942",    // اسم المستخدم للبوت
    version: false,                // يكتشف الإصدار تلقائيًا
  });

  bot.once("spawn", () => {
    console.log("البوت جاهز في السيرفر!");
    bot.chat("/login 123123123");
    bot.loadPlugin(pathfinder);

    const mcData = require("minecraft-data")(bot.version);
    const movements = new Movements(bot, mcData);
    bot.pathfinder.setMovements(movements);

    const center = { x: 56, y: 230, z: 67 };
    const squarePoints = [
      { x: center.x + 2, y: center.y, z: center.z + 2 },
      { x: center.x - 2, y: center.y, z: center.z + 2 },
      { x: center.x - 2, y: center.y, z: center.z - 2 },
      { x: center.x + 2, y: center.y, z: center.z - 2 },
    ];

    let currentPoint = 0;

    function moveToNextCorner() {
      const point = squarePoints[currentPoint];
      bot.pathfinder.setGoal(
        new goals.GoalBlock(
          Math.floor(point.x),
          Math.floor(point.y),
          Math.floor(point.z)
        )
      );
      currentPoint = (currentPoint + 1) % squarePoints.length;
    }

    bot.on("goal_reached", () => {
      setTimeout(moveToNextCorner, 300);
    });

    moveToNextCorner();
  });

  bot.on("message", (message) => {
    console.log("Chat:", message.toAnsi());
  });

  bot.on("kicked", (reason) => {
    console.log("تم طرد البوت:", reason);
    reconnect();
  });

  bot.on("error", (err) => {
    console.log("حدث خطأ:", err);
    reconnect();
  });

  function reconnect() {
    console.log("إعادة الاتصال بعد 3 ثوانٍ...");
    setTimeout(createBot, 3000);
  }
}

keep_alive();
createBot();
