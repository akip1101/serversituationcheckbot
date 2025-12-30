const Discord = require("discord.js");

const client = new Discord.Client({
  ws: {
    intents: [
      "GUILDS",
      "GUILD_MESSAGES"
    ]
  },
  partials: ["MESSAGE", "CHANNEL", "REACTION"]
});


const PREFIX = "!mc";

client.once("ready", () => {
  console.log(`ログイン成功: ${client.user.tag}`);
});

client.on("message", message => {
  if (message.author.bot) return;
  if (!message.guild) return;
  if (!message.content.startsWith(PREFIX)) return;

  const args = message.content.split(" ");
  const command = args[1];

  // ===== 起動 =====
  if (command === "start") {
    const ip = args[2];
    if (!ip) {
      return message.channel.send(
        "❌ IPアドレスを指定してください\n例: `!mc start play.example.com`"
      );
    }

    const embed = new Discord.MessageEmbed()
      .setTitle("🟢 Minecraft サーバー起動")
      .setColor("#2ecc71")
      .setDescription("サーバーが起動しました！")
      .addField("🌐 サーバーIP", `\`\`\`${ip}\`\`\``)
      .addField("👤 起動者", message.author.tag, true)
      .setFooter("Minecraft Server Bot")
      .setTimestamp();

    message.channel.send(embed);
  }

  // ===== 停止 =====
  if (command === "stop") {
    const embed = new Discord.MessageEmbed()
      .setTitle("🔴 Minecraft サーバー停止")
      .setColor("#e74c3c")
      .setDescription("サーバーが停止しました。")
      .addField("👤 停止者", message.author.tag, true)
      .setFooter("Minecraft Server Bot")
      .setTimestamp();

    message.channel.send(embed);
  }
});

// 落下防止（必須）
process.on("unhandledRejection", console.error);
process.on("uncaughtException", console.error);

client.login(process.env.DISCORD_TOKEN);
