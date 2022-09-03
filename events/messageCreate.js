const { EmbedBuilder } = require("discord.js");

const fs = require('fs');
var obj;
fs.readFile('data/data.json', 'utf8', function (err, data) {
  if (err) throw err;
  obj = JSON.parse(data);
});

module.exports = {
    name: "messageCreate",
    execute(message_obj) {
        if (message_obj.content.startsWith("!rit")) {
            //console.log(obj);
            //message_obj.channel.send("Test");
            let embed = new EmbedBuilder()
                .setColor("FFC733")
                .setTitle("Today's Visiting Chefs")
                .setDescription("Here are today's visiting chefs")
            
            Object.entries(obj).forEach(entry => {
                const [key, value] = entry;
                embed = embed.addFields(
                    { name: key, value: value }
                )
            })
            embed.setTimestamp()
            message_obj.channel.send({ embeds: [embed]});

        }
    }
}