module.exports = {
    name: 'sendsloth',
    description: 'sends a sloth',
    execute(message, args) {
        const pic = require('./slothpic.js');
        const gif = require('./slothgif.js');

        const i = Math.floor(Math.random() * 2) + 1;
        if (i === 1) {
            pic.execute(message, args);
        }
        else if (i === 2) {
            gif.execute(message, args);
        }
        else{
            message.channel.send('you got the super secret option');
        }
    },
};