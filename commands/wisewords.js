const words = [
    'eat ass, live fast',
    'never stand beneath a sloth',
    'Wise men speak because they have something to say; Fools because they have to say something.',
    '"*stereotypical chinese voice"* love will find you next week, but don\'t stay to long husband find you too',
    '*"stereotypical chinese voice"* next time you get on plane change to exit row. this will make sure you don\'t sit next to big fatass',
    '*"stereotypical chinese voice"* you going to get a visitor next week, don\'t open door it jehova witness, they so anoying',
    '*"stereotypical chinese voice"* you going to go to fancy restaurant, order snails DON\'T EAT THEM that disgusting, snail very dirty',
    'when people say, you\'re gonna regret that in the morning. sleep until noon',
    'making fun of someone you\'re angry with is childish. be an adult and hit them with your car',
    '*"stereotypical chinese voice"* only have 1 person on the trampoline at a time, else back go crack',
];

module.exports = {
    name: 'wisewords',
    description: 'Wise words and quotes',
    execute(message) {
        // message.channel.bulkDelete(1);

        const i = Math.floor(Math.random() * words.length);
        message.channel.send(words[i]);
    },
};