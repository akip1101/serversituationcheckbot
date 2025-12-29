const Discord = require("discord.js");
const client = new Discord.Client({
  ws: { intents: ["GUILDS", "GUILD_MESSAGES"] }
});

const PREFIX = "!mc";

client.once("ready", () => {
  console.log(`ログイン成功: ${client.user.tag}`);
});

client.on("message", message => {
  if (message.author.bot) return;
  if (!message.content.startsWith(PREFIX)) return;

  const args = message.content.split(" ");
  const command = args[1];

  // !mc start <ip>
  if (command === "start") {
    const ip = args[2];
    if (!ip) {
      return message.channel.send("❌ IPアドレスを指定してください\n例: `!mc start play.example.com`");
    }

    const embed = new Discord.MessageEmbed()
      .setTitle("🟢 マインクラフトサーバー起動")
      .setColor("#00ff88")
      .addField("IPアドレス", `\`${ip}\``)
      .addField("起動者", message.author.tag)
      .setTimestamp();

    message.channel.send(embed);
  }

  // !mc stop
  if (command === "stop") {
    const embed = new Discord.MessageEmbed()
      .setTitle("🔴 マインクラフトサーバー停止")
      .setColor("#ff4444")
      .addField("停止者", message.author.tag)
      .setTimestamp();

    message.channel.send(embed);
  }
});

// エラーでBotが落ちるのを防ぐ
process.on("unhandledRejection", console.error);
process.on("uncaughtException", console.error);

client.login(process.env.DISCORD_TOKEN);
