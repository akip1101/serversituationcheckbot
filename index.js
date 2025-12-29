const Discord = require("discord.js");
const client = new Discord.Client();

client.once("ready", () => {
  console.log(`ログイン成功: ${client.user.tag}`);
});

client.on("message", message => {
  if (message.author.bot) return;
  if (message.content === "ping") {
    message.channel.send("pong");
  }
});

client.login(process.env.DISCORD_TOKEN);
