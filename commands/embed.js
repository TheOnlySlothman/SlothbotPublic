const Discord = require('discord.js');

module.exports = {
    name: 'embed',
    description: 'embeds',
    usage: '<name of file>',
    execute(message, args) {

        const exampleEmbed = new Discord.MessageEmbed()
            .attachFiles(['./assets/' + args[0]])
            .setImage('attachment://' + args[0]);

        message.channel.send(exampleEmbed);
    },
};