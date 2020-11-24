module.exports = {
    name: 'destroy',
    description: 'deletes the amount of messages',
    args: true,
    usage: '<amount>',
    guildOnly: true,
    execute(message, args) {
        const { my_Id } = require('../config.json');
        if (message.author.id === my_Id) {
            message.delete().then(
                (message.channel.bulkDelete(args[0]))).then(
                message.channel.send('I HAVE DESTROYED ' + args[0] + ' MESSAGES, SOON THE WORLD SHALL SUFFER THE SAME FATE'));
        }
    },
};