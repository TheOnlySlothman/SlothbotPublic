module.exports = {
    name: 'yesorno',
    description: 'Says yes or no',
    execute(message) {

        const { my_Id } = require('../config.json');

        if (message.author.id === my_Id) {
            message.channel.send('Yes');
        }
        else {
            message.channel.send('No');
        }
    },
};