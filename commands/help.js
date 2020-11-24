const { prefix } = require('../config.json');
const Discord = require('discord.js');

module.exports = {
    name: 'help',
    description: 'List all of my commands or info about a specific command.',
    aliases: ['commands'],
    usage: '[command]',
    cooldown: 5,
    execute(message, args) {
        const data = [];
        const { commands } = message.client;
        const embed = new Discord.MessageEmbed()
            .setTitle('Here\'s a list of all my commands:')
            .setColor('#66ff95')
            .setThumbnail(message.client.user.avatarURL);
        if (!args.length || args[0] === null) {
            data.push(commands.map(command => embed.addField(`**__${prefix}${command.name}__**`, `"${command.description}" \n\`${prefix}${command.name} ${ command.usage || ''}\``)));

            return message.author.send(embed)
                .then(() => {
                    if (message.channel.type === 'dm') {return;}
                    message.reply('I\'ve sent you a DM with all my commands!');
                })
                .catch(error => {
                    console.error(`Could not send help DM to ${message.author.tag}.\n`, error);
                    message.reply('it seems like I can\'t DM you! Do you have DMs disabled?');
                });
        }

        const name = args[0].toLowerCase();
        const command = message.client.commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));

        if (!command) {
            return message.reply('that\'s not a valid command!');
        }

        const SpecificEmbed = new Discord.MessageEmbed()
            .setTitle(prefix + command.name)
            .addField('Description', `"${command.description}"`)
            .addField('Usage', `${prefix}${command.name} ${command.usage}`)
            .setFooter('Stolen by Intense Intents in Tents inc. Developed by Simonsen Techs');

        message.channel.send(SpecificEmbed);
    },
};