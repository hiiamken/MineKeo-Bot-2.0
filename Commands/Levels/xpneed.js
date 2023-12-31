const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const Levels = require("discord.js-leveling");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("xpneed")
    .setDescription("Kiểm tra cần bao nhiều kinh nghiệm để lên cấp.")
    .addIntegerOption((options) =>
      options
        .setName("level")
        .setDescription("Cấp độ mong muốn.")
        .setRequired(true)
    ),
  async execute(interaction) {

    const allowedChannelId = "1181147913703936021";

    if (interaction.channelId !== allowedChannelId) {
      const allowedChannel =
        interaction.guild.channels.cache.get(allowedChannelId);
      const channelMention = `<#${allowedChannel.id}>`;

      return interaction.reply({
        content: `Bạn chỉ có thể sử dụng lệnh này trong ${channelMention}.`,
        ephemeral: true,
      });
    }

    const { options } = interaction;

    const level = options.getInteger("level");

    const xpAmout = Levels.xpFor(level);

    interaction.reply({
      content: `Bạn cần ${xpAmout} để đạt cấp độ ${level}.`,
      ephemeral: true,
    });
  },
};
