module.exports = {
    name: 'kick',
    description: 'Kicks the selected player',
    args: true,
    usage: '<player>',
    execute(message) {
        message.channel.send('You want me to do what? have you seen my legs');
    },
};