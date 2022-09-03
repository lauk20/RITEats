// Require the necessary discord.js classes
const { Client, GatewayIntentBits, EmbedBuilder } = require('discord.js');
require('dotenv').config();
const token = process.env.DISCORD_TOKEN;

const path = require("path");
const fs = require("fs");
const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

const cron = require("cron");
const { exec } = require('child_process');

// Create a new client instance
const client = new Client({ 
    intents: [
        GatewayIntentBits.Guilds, 
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ] 
});

// When the client is ready, run this code (only once)
client.once('ready', () => {
	console.log('Ready!');
});

for (const file of eventFiles) {
	const filePath = path.join(eventsPath, file);
	const event = require(filePath);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}

const execute = () => {
    const data = fs.readFileSync(__dirname + '/data/data.json', { endoding: 'utf8'})
    const obj = JSON.parse(data)
    
    client.channels.cache.filter((channel) => channel.name === "visiting-chef").forEach(channel => {
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
        channel.send({ embeds: [embed]});
    })
}

const scrape = () => {
    exec("python scrape.py", (error, stdout, stderr) => {
        if (error !== null) {
            console.log(error)
        }
    })
    execute()
}

const scheduledMessage = new cron.CronJob("00 00 08 * * *", scrape)
scheduledMessage.start();

// Login to Discord with your client's token
client.login(token);