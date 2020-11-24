// const { my_Id } = require('./../config.json');
// eslint-disable-next-line no-unused-vars
const { Message, Collection, MessageReaction, User } = require('discord.js');

const boardPieces = [':regional_indicator_x:', ':regional_indicator_o:', ':free:'];

/** @param {Message} message @param {{piece: string, reaction: string}[][]} pieces @param {{user: User, emojiPiece: string}} currentPlayer @param {{user: User, emojiPiece: string}[]} players*/
class Board {
    /** @param {Message} message @param {{piece: string, reaction: string}[][]} pieces @param {{user: User, emojiPiece: string}[]} users @param {{user: User, emojiPiece: string}} currentPlayer*/
    /** @param {Message} message @param {User[]} users*/
    constructor(message, users) {
        let i = 0;
        this.message = message;
        this.pieces = [[{ piece:':free:', reaction:'↖' }, { piece:':free:', reaction:'⬅' }, { piece:':free:', reaction:'↙' }],
            [{ piece:':free:', reaction:'⬆' }, { piece:':free:', reaction:'⏺' }, { piece:':free:', reaction:'⬇' }],
            [{ piece:':free:', reaction:'↗' }, { piece:':free:', reaction:'➡' }, { piece:':free:', reaction:'↘' }]];
        this.players = users.map(x => x = { user: x, emojiPiece: boardPieces[i++] });
        this.currentPlayer = this.players[0];
    }
}

const playerReactions = ['🎮'];

const playerAmount = 2;
const timeOutSecounds = 300;
const testing = false;

module.exports = {
    name: 'ttt',
    description: 'Let\'s play some TicTacToe (Requires 2 players)',
    args: false,
    usage: '<board>',
    guildOnly: true,
    cooldown: 15,
    execute(message) {
        createBoard(message);
    },
};


async function createBoard(message) {
    /* const board = {
        message: {},
        pieces:
        [[{ piece:':free:', reaction:'↖' }, { piece:':free:', reaction:'⬅' }, { piece:':free:', reaction:'↙' }],
            [{ piece:':free:', reaction:'⬆' }, { piece:':free:', reaction:'⏺' }, { piece:':free:', reaction:'⬇' }],
            [{ piece:':free:', reaction:'↗' }, { piece:':free:', reaction:'➡' }, { piece:':free:', reaction:'↘' }]],
        currentPlayer: {},
        players: [{ user: null, emojiPiece: boardPieces[0] }, { user: null, emojiPiece: boardPieces[1] }],
    };*/
    let board = {};
    /*
    board.pieces.forEach(element => {
        element.forEach(innerElement => {
            innerElement.piece = boardPieces[2];
        },
        );

    });
    */
    // eslint-disable-next-line require-atomic-updates
    const t = 2;
    const msg = await message.channel.send(
        `${boardPieces[t]} ${boardPieces[t]} ${boardPieces[t]} \n` +
    `${boardPieces[t]} ${boardPieces[t]} ${boardPieces[t]} \n` +
    `${boardPieces[t]} ${boardPieces[t]} ${boardPieces[t]} \n`);

    react(msg, playerReactions);

    const filter = (reaction, user) => playerReactions.includes(reaction.emoji.toString()) && user.bot == false;
    const collector = msg.createReactionCollector(filter, { maxUsers: playerAmount, idle: timeOutSecounds * 1000 });
    collector.on('end', collected => {
        if (collected.size != 0 && (collected.first().count > 2 || (collected.first().count == 2 && testing))) {
            board = new Board(msg, getPlayers(message, collected.first()));
            removeReacts(board);
            boardCollecter(board);
        }
        else{
            removeReacts(board);
            react(board.message, '⛔');

            // don't do this
            // createBoard(message);
        }
    },
    );

}

/** @param {{message: Message, pieces: {piece: string, reaction: string}[][]}, } board*/
/** @param {Board} board*/
async function boardCollecter(board) {

    react(board.message, toArray(board.pieces).map(x => x.reaction));

    board.currentPlayer = board.players[0];

    const filter = (reaction, user) => toArray(board.pieces).map(x => x.reaction).includes(reaction.emoji.toString()) && user.bot == false;
    const collector = board.message.createReactionCollector(filter, { idle: timeOutSecounds * 1000 });
    // collector.on('collect', r => console.log(`Collected ${r.emoji.name}`));
    collector.on('collect', r => performAction(board, r.emoji.toString(), r.users.cache.find(x => x.bot == false)));
    // collector.on('end', collected => console.log(`Collected ${collected.size} items`));
}

function toArray(twoDimensionalArray) {
    const oneDimensionalArray = [];
    for (let x = 0; x < twoDimensionalArray.length; x++) {
        for (let y = 0; y < twoDimensionalArray[x].length; y++) {
            oneDimensionalArray.push(twoDimensionalArray[x][y]);
        }
    }
    return oneDimensionalArray;
}


/** @param {Message} message @param {MessageReaction} reaction **/
function getPlayers(message, reaction) {
    const temp = reaction.users.cache.filter(x => x.bot == false).array();
    for (let index = 0; index < temp.length; index++) {
        return temp;
    }
}

function updateBoard(board) {
    return board.message.edit(board.pieces[0][0].piece + ' ' + board.pieces[1][0].piece + ' ' + board.pieces[2][0].piece + '\n' +
    board.pieces[0][1].piece + ' ' + board.pieces[1][1].piece + ' ' + board.pieces[2][1].piece + '\n' +
    board.pieces[0][2].piece + ' ' + board.pieces[1][2].piece + ' ' + board.pieces[2][2].piece);
}

/** @param {Message} msg @param {string[]} arr*/
function react(msg, arr) {
    if(msg == null) {
        return;
    }
    for (let index = 0; index < arr.length; index++) {
        msg.react(arr[index]);
    }
}

function removeReacts(board) {
    if(board.message == null) {
        return;
    }
    board.message.reactions.removeAll();
}


function removeReaction(board, emojiString) {
    board.message.reactions.cache.find(r => r.emoji.toString() == emojiString).remove();
}

function performAction(board, emojiString, player) {
    if(toArray(board.pieces).filter(x => x.piece == board.currentPlayer.emojiPiece).length >= 3) {
        removePiece(board, emojiString, player);
    }
    else{
        placePiece(board, emojiString, player);
    }

}

/** @param {Board} board @param {string} emojiString, @param {User} user */
function placePiece(board, emojiString, user) {
    if (user != board.currentPlayer.user) {
        removeReaction(board, emojiString);
        react(board.message, emojiString);
        return;
    }

    // boardArr[boardReactions.findIndex(e => e == emojiString)] = emojiPieces[players.findIndex(x => x == player)];

    toArray(board.pieces).find(x => x.reaction == emojiString).piece = board.players.find(x => x.user == user).emojiPiece;

    removeReaction(board, emojiString);
    updateBoard(board);

    let arr = toArray(board.pieces).filter(x => x.piece == board.currentPlayer.emojiPiece);
    if(arr.length >= 3) {
        if (threeInARow(board)) {
            removeReacts(board);
            react(board.message, '✅');
            // collector.stop();
            return;
        }
    }


    if (user == board.players[0].user && !testing) {
        board.currentPlayer = board.players[1];
    }
    else{
        board.currentPlayer = board.players[0];
    }

    arr = toArray(board.pieces).filter(x => x.piece == board.currentPlayer.emojiPiece);
    if(arr.length >= 3) {
        removeReacts(board);


        react(board.message, toArray(board.pieces).filter(x => x.piece == board.currentPlayer.emojiPiece).map(y => y.reaction));

    }


}
/** @param {string} emojiString, @param {User} player */
function removePiece(board, emojiString, player) {
    if (player != board.currentPlayer.user) {
        removeReaction(board, emojiString);
        react(board.message, emojiString);
        return;
    }

    toArray(board.pieces).find(x => x.reaction == emojiString).piece = boardPieces[2];

    updateBoard(board);
    removeReacts(board);
    react(board.message, toArray(board.pieces).filter(x => x.piece == boardPieces[2]).map(y => y.reaction));
}

function threeInARow(board) {
    // check if there are 3 pieces in a row

    const arr = [];

    for (let index = 0; index < board.pieces.length; index++) {
        arr.push(areTheyTheSame(board.pieces[index][0].piece, board.pieces[index][1].piece, board.pieces[index][2].piece));
        arr.push(areTheyTheSame(board.pieces[0][index].piece, board.pieces[1][index].piece, board.pieces[2][index].piece));
    }

    arr.push(areTheyTheSame(board.pieces[0][0].piece, board.pieces[1][1].piece, board.pieces[2][2].piece));
    arr.push(areTheyTheSame(board.pieces[0][2].piece, board.pieces[1][1].piece, board.pieces[2][0].piece));

    return arr.some(x => x == true);
}

function areTheyTheSame(a, b, c) {
    return a == b && b == c && a != boardPieces[2];
}

