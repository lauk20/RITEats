const { EmbedBuilder, AttachmentBuilder } = require("discord.js");

const fs = require('fs');
const path = require('path');

module.exports = {
    name: "messageCreate",
    execute(message_obj) {
        if (message_obj.content.startsWith("!rit")) {
            const data = fs.readFileSync(path.resolve(__dirname, '../data/now_data.json'), { endoding: 'utf8'})
            const obj = JSON.parse(data)
            //console.log(obj);
            //message_obj.channel.send("Test");
            const file = new AttachmentBuilder('./assets/riteatslogo.png');
            let embed = new EmbedBuilder()
                .setColor("FFC733")
                .setTitle("Currently Open Dining Halls")
                .setAuthor({ name: 'RIT Eats', iconURL: 'attachment://riteatslogo.png' })
                .setDescription("Here are the open dining halls!")
                .setThumbnail("attachment://riteatslogo.png")
            
            Object.entries(obj).forEach(entry => {
                const [key, value] = entry;
                embed = embed.addFields(
                    { name: key, value: value, inline: true}
                )
            })
            embed.setTimestamp()
            message_obj.channel.send({ embeds: [embed], files: [file]});

        }
    }
}