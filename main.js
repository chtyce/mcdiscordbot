const mc = require("minecraft-server-util");
const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES"] });

//-------------Settings--------
const CLIENT_TOKEN =
  "TOKEN_BURAYA_GELECEK";
const embedPrefix = "!server";
//const serverIp = "mc.hypixel.net";
const serverIp = "oyna.adalances.com";
const serverName = "Adalances Towny ";
const intervalTime = 5000; // 1000 = 1 sec

//-------------------------

client.on("ready", () => {
  console.log('Start');

  setInterval(function () {
    mc.status(serverIp)
      .then((res) => {
        client.user.setActivity(serverName + res.players.online + " Kişi");
      })
      .catch((err) => {
        client.user.setActivity(serverName + "Offline");
      });
  }, intervalTime);
});

client.on("message", (msg) => {
  if (msg.author.bot) return;

  if (msg.content.startsWith(embedPrefix)) {
    mc.status(serverIp)
      .then((res) => {
        embed = new MessageEmbed()
          .setColor("#03a613")
          .setTitle(serverName)
          .setDescription('Online')
          .addField("Sunucu İp", serverIp, false)
          .addField(
            "Sunucu Kapasitesi: " + res.players.max,
            "Online Oyuncu: " + res.players.online,
            false
          )
          .addField("Sunucu Versiyonu:", res.version.name, false);
          msg.channel.send({ embeds: [embed] });
      })
      .catch((err) => {
        embed = new MessageEmbed()
          .setColor("#941327")
          .setTitle(serverName)
          .setDescription('Offline')
          msg.channel.send({ embeds: [embed] });
      });
  }
});

client.login(CLIENT_TOKEN);
