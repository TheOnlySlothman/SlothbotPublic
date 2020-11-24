module.exports = {
    name: 'setactivity',
    args: true,
    usage: '<playing, watching or listening> <string>',
    description: 'changes activity',
    execute(message, args) {

        const { my_Id } = require('../config.json');
        const arr = [];

        for(let i = 1; i < args.length; i++) {
            arr.push(args[i]);
        }

        if (message.author.id === my_Id) {
            if (args[0] === 'watching') {
                message.client.user.setActivity(arr.join(' '), { type: 'WATCHING' });
            }
            else if (args[0] === 'playing') {
                message.client.user.setActivity(arr.join(' '), { type: 'PLAYING' });
            }
            else if (args[0] === 'listening') {
                message.client.user.setActivity(arr.join(' '), { type: 'LISTENING' });
            }

            message.channel.send('Changed Activity, hope you\'re happy Danny boi');
        }
    },
};