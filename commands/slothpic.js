module.exports = {
    name: 'slothpic',
    description: 'Searches google for slothes',
    execute(message) {
        const request = require('request');
        const Config = require('../config.json');
        const Discord = require('discord.js');


        if (!Config || !Config.api_key || !Config.google_custom_search) {
            message.channel.send('Image search requires both a YouTube API key and a Google Custom Search key!');
            return;
        }
        // gets us a random result in first 5 pages
        const page = 1 + Math.floor(Math.random() * 5) * 10;
        // we request 10 items
        request('https://www.googleapis.com/customsearch/v1?key=' + Config.api_key + '&cx=' + Config.google_custom_search + '&q=' + 'sloth' + '&searchType=image&alt=json&num=10&start=' + page, function(err, res, body) {

            // "https://www.googleapis.com/customsearch/v1?key=AIzaSyAeAr2Dv1umzuLes_zhlY0lON4Pf_uAKeM&cx=013524999991164939702:z24cpkwx9nz&q=sloth&searchType=image&alt=json&num=10&start=31"
            let data;
            try {
                data = JSON.parse(body);
            }
            catch (error) {
                console.log(error);
                return;
            }
            if (!data) {
                console.log(data);
                message.channel.send('Error:\n' + JSON.stringify(data));
                return;
            }
            else if (!data.items || data.items.length == 0) {
                console.log(data);
                message.channel.send('No result for \'' + 'sloth' + '\'');
                return;
            }
            const randResult = data.items[Math.floor(Math.random() * data.items.length)];
            const embed = new Discord.MessageEmbed().setImage(randResult.link)
                .setColor('#5f2e2e');
            message.channel.send(embed);
        });
    },
};