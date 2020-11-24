module.exports = {
    name: 'say',
    description: 'echoes a message',
    args: true,
    usage: '<message>',
    execute(message, args) {
        if (message.channel.type != 'dm') {
            message.delete();
        }
        message.channel.send(args.join(' '));
    },
};