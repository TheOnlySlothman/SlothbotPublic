const fs = require('fs');
const Discord = require('discord.js');
const { prefix, token, my_Id } = require('./config.json');
let { ban_words } = require('./config.json');

// const { config } = require('process');

const client = new Discord.Client();
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

let delay = 0;

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);

    // set a new item in the Collection
    // with the key as the command name and the value as the exported module
    client.commands.set(command.name, command);
}


client.once('ready', () => {
    console.log('Ready!');
    // client.user.setActivity('$HELPlesly', { type: 'WATCHING' });
    client.user.setActivity('$help stuck in tree');
});
client.on('message', message => {
    if (message.author.bot) return;

    if (message == null) {
        return;
    }
    /*
    if (message.content.startsWith('*') || message.content.startsWith('<@562176550674366464>')) {
        message.channel.bulkDelete(1);
        message.channel.send('no penguins');
    }
    */

    const args = message.content.slice(prefix.length).split(/ +/);
    const commandName = args.shift().toLowerCase();

    const command = client.commands.get(commandName)
        || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
    if (!message.content.startsWith(prefix) || message.author.bot) {return;}

    if (message.author.id === my_Id) {

        if (commandName === 'slomode') {

            if (!args.length) {
                return message.channel.send(`You didn't provide any arguments, ${message.author}!`);
            }
            else {
                delay = parseInt(args[0]) * 1000;
                message.channel.send('delay is now ' + delay.toString(10) / 1000 + ' seconds');
            }
        }
        else if (message.content === 'join') {
            client.emit('guildMemberAdd', message.member || message.guild.fetchMember(message.author));
        }
        else if (commandName === 'banwords') {
            ban_words = !ban_words;
        }
    }

    if (!command) return;


    console.log('treating ' + message.content + ' from ' + message.author.username + '#' + message.author.discriminator + ' as command');

    if (command.guildOnly && message.channel.type !== 'text') {
        return message.reply('I can\'t execute that command inside DMs!');
    }

    if (command.args && !args.length) {
        let reply = `You didn't provide any arguments, ${message.author}!`;

        if (command.usage) {
            reply += `\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\``;
        }

        return message.channel.send(reply);
    }

    try {
        setTimeout(function() {
            command.execute(message, args);
        }, delay);
    }
    catch (error) {
        console.error(error);
        // message.reply('there was an error trying to execute that command! <@290131910091603968> get in here');
        console.log('Command ' + message.content + ' from ' + message.author + ' went wrong');

        sendToTestingDiscord('Command ' + message.content + ' from ' + message.author + ' went wrong\n' + error);
    }

    process.on('unhandledRejection', error => {
        console.error('Uncaught Promise Rejection', error);
        sendToTestingDiscord('Uncaught Promise Rejection\n' + error);
    },
    );

    function sendToTestingDiscord(errorMessage) {
        // const guild = new Discord.Guild(client, '641995141477040138');
        const guild = client.guilds.cache.find(g => g.id == '641995141477040138');

        if (guild.available) {
            guild.channels.cache.find(c => c.id == 656121729671757854).send(errorMessage);
        }
    }
});

/*
client.on('guildMemberAdd', member => {
    // Send the message to a designated channel on a server:
    const channel = member.guild.channels.find(ch => ch.name === 'santas-door');
    // Do nothing if the channel wasn't found on this server
    if (!channel) return;
    const arr = [
        `Welcome to the slothfields motherfucker, ${member}`,
        `Whaddup my hombre ${member}`,
        `${member} i have been watching you for some time`,
        `Welcome to my Harem ${member}`,
    ];
    const rand = Math.floor(Math.random() * arr.length);
    // Send the message, mentioning the member
    channel.send(arr[rand]);
});

client.on('guildMemberRemove', member => {
    // Send the message to a designated channel on a server:
    //const channel = member.guild.channels.find(ch => ch.name === 'santas-door');
    // Do nothing if the channel wasn't found on this server
    if (!channel) return;
    // Send the message, mentioning the member
    channel.send(`${member} left, what a weakling`);
    channel.send(`${member} good riddance`);
});
*/

client.login(token);
// things to do