module.exports = {
    name: 'send',
    description: 'sends a dm',
    args: true,
    usage: '<mentioned user> <message>',
    execute(message, args) {

        if (args[0]) {
            const user = getUserFromMention(args[0]);
            if (!user) {
                return message.reply('Please use a proper mention.');
            }
            const arr = [];

            for(let i = 1; i < args.length; i++) {
                arr.push(args[i]);
            }
            message.delete()
                .then(user.send(arr.join(' ')));
        }


        function getUserFromMention(mention) {
            if (!mention) return;

            if (mention.startsWith('<@') && mention.endsWith('>')) {
                mention = mention.slice(2, -1);

                if (mention.startsWith('!')) {
                    mention = mention.slice(1);
                }

                return message.client.users.cache.get(mention);
            }
        }

    },
};