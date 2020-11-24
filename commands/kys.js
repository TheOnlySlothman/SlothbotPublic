const Discord = require('discord.js');

module.exports = {
    name: 'kys',
    aliases: ['gotosleep'],
    description: 'tries to end this miserable existence',
    execute(message) {

        const { my_Id } = require('../config.json');

        if (message.author.id === my_Id) {
            const exampleEmbed = new Discord.MessageEmbed()
                .attachFiles(['./assets/explosivedeath.gif'])
                .setImage('attachment://explosivedeath.gif');
            message.channel.send(exampleEmbed)
                .then(() => process.exit());
        }
        else {
            message.channel.send('how about you kys');
        }
    },
};