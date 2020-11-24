const Discord = require('discord.js');

const factArr = [
    'Sloths are clumsy on land but are great swimmers.',
    'Sloths are arboreal animals, so they spend most of their time in trees.',
    'Sloths only urinate/defecate once a week.',
    'Contrary to their reputation, sloths only sleep about 10 hours a day.',
    'Sloths defecate and urinate at the same place every time and because of this they are vulnerable to predators.',
    'Algae grow on their fur, which camouflages them green.',
    'Sloths diets consist mostly of leaves which gives them minimal energy and nutrition.',
    'Sloths� primary predators include eagles, snakes, and jaguars.',
    'Sloths can retain their grip after death.',
    'Three-toed sloths can turn their heads almost 360 degrees.',
    'Sloths are nocturnal animals.',
    'Sloths have up to four-inch-long claws used to hold onto tree branches.',
    'Sloths are solitary creatures who only gather to mate.',
    'Female sloths are normally pregnant for seven to 10 months and will only give birth to one baby.',
    'Sloths can live up to 40 years old.',
];

const realFactArr = [
    'Sloths diets consist mostly of the souls of their enemies.',
    'Contrary to their reputation, sloths don\'t sleep and are always aware of what is happening around them',
    'Sloths\' Have no predators.',
    'Sloths can retain their grip after death, so there is no escape',
    'Three-toed sloths can turn their heads almost 360 degrees.',
    'Sloths are nocturnal animals.',
    'Sloths have up to four-inch-long claws used to tear the flesh of their enemies.',
    'Sloths are solitary creatures because 2 sloths in close proximity would be too powerful.',
    'Sloths aren\'t born they were created.',
    'Sloths can live up to 500 years old. where as ArchSloths are Immortal',
    'Sloths are able to regenerate lost limbs and body organs.',
    'There is actually a sloth behind you right now',
];


module.exports = {
    name: 'fact',
    description: 'Gives a random sloth fact',
    execute(message) {
        // const factArr = require(`../arrays/factarray`);
        // const realFactArr = require(`../arrays/realfactarray`);
        const { my_Id } = require('../config.json');

        const embed = new Discord.MessageEmbed()
            .setTitle('Here\'s a fact..')
            // .setColor(0xf7afff)
            .setColor(0x66ff95)
            .attachFiles(['./assets/pfp.jpg'])
            .setThumbnail('attachment://pfp.jpg')
            .setFooter('Certified facts by the institute of Intense Intents in Tents');

        if (message.author.id === my_Id) {
            const i = Math.floor(Math.random() * realFactArr.length);
            embed
                .setDescription(realFactArr[i]);
            message.channel.send(embed);
        }
        else {
            const i = Math.floor(Math.random() * factArr.length);
            embed
                .setDescription(factArr[i]);
            message.channel.send(embed);
        }
    },
};