const {
  Client,
  GatewayIntentBits,
  SlashCommandBuilder,
  Routes,
  REST,
  EmbedBuilder
} = require("discord.js");

const client = new Client({
  intents: [GatewayIntentBits.Guilds]
});


// ===== スラッシュコマンド登録 =====
const commands = [
  new SlashCommandBuilder()
    .setName("mcstart")
    .setDescription("Minecraftサーバーを起動したことを通知")
    .addStringOption(option =>
      option
        .setName("ip")
        .setDescription("サーバーIP")
        .setRequired(true)
    ),
  new SlashCommandBuilder()
    .setName("mcstop")
    .setDescription("Minecraftサーバーを停止したことを通知")
].map(cmd => cmd.toJSON());

const rest = new REST({ version: "10" }).setToken(process.env.DISCORD_TOKEN);

(async () => {
  try {
    await rest.put(
      Routes.applicationCommands(process.env.CLIENT_ID),
      { body: commands }
    );
    console.log("スラッシュコマンド登録完了");
  } catch (error) {
    console.error(error);
  }
})();

// ===== Bot起動 =====
client.once("ready", () => {
  console.log(`ログイン成功: ${client.user.tag}`);
});

// ===== コマンド処理 =====
client.on("interactionCreate", async interaction => {
  if (!interaction.isChatInputCommand()) return;

  // 起動
  if (interaction.commandName === "mcstart") {
    const ip = interaction.options.getString("ip");

    const embed = new EmbedBuilder()
      .setTitle("🟢 Minecraft サーバー起動")
      .setColor(0x2ecc71)
      .addFields(
        { name: "🌐 サーバーIP", value: `\`\`\`${ip}\`\`\`` },
        { name: "👤 起動者", value: interaction.user.tag }
      )
      .setTimestamp();

    await interaction.reply({ embeds: [embed] });
  }

  // 停止
  if (interaction.commandName === "mcstop") {
    const embed = new EmbedBuilder()
      .setTitle("🔴 Minecraft サーバー停止")
      .setColor(0xe74c3c)
      .addFields({
        name: "👤 停止者",
        value: interaction.user.tag
      })
      .setTimestamp();

    await interaction.reply({ embeds: [embed] });
  }
});

// 落下防止
process.on("unhandledRejection", console.error);
process.on("uncaughtException", console.error);

client.login(process.env.DISCORD_TOKEN);
