const tmi = require('tmi.js');
const pb = require("@madelsberger/pausebuffer");

const { Pool, Client } = require('pg');

const pool = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});
/*
const pool2 = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
});
*/

pool.connect();

//console.log( process.env.DATABASE_URL )

/*
const cli = async (req, res) => {
    try {
        await pool.connect();
        const result = await cli.query('SELECT * FROM scoreboard');
        const results = { 'results': (result) ? result.rows : null};
        client.release();
    } catch (err) {
        console.error(err);
        //res.send("Error " + err);
    }
};

cli();
*/

const insertNewUser = 'INSERT INTO scoreboard(username, score) VALUES($1, $2) RETURNING *'
const insertNewScore0 = 'UPDATE scoreboard SET score = score - 10 WHERE username = $1 RETURNING *'
const insertNewScore1 = 'UPDATE scoreboard SET score = score + 1 WHERE username = $1 RETURNING *'
const insertNewScore2 = 'UPDATE scoreboard SET score = score + 2 WHERE username = $1 RETURNING *'
const insertNewScore3 = 'UPDATE scoreboard SET score = score + 3 WHERE username = $1 RETURNING *'
const insertNewScore4 = 'UPDATE scoreboard SET score = score + 6 WHERE username = $1 RETURNING *'
const insertNewScore5 = 'UPDATE scoreboard SET score = score + 10 WHERE username = $1 RETURNING *'


const getScore = 'SELECT score FROM scoreboard WHERE username = $1';
//const queryAll = 'select * from scoreboard';

/*
let messageName = "03h7";
//console.log(messageName);
const messageNameArray = messageName.split();
console.log(messageNameArray[0])

// callback

pool.query(queryAll, (err, res) => {
  if (err) {
    console.log(err.stack)
  } else {
    console.log(res.rows)
    // { name: 'brianc', email: 'brian.m.carlson@gmail.com' }
  }
})
*/

//var animaux = ['🐒','🐈','🦛','🐕','🐀','🐢','🐓','🐘','🐅','🐃','🐖','🐄','🐏','🐁','🐋','🐎','🐪','🦙','🦨','🐊','🦖','🐛','🏃','PEEPEES','🐡','🐌','🦕','🦗','🦃','🐦','🦘','🦜']

var animalst0 = ['kamelKot '] // -10 points 1%
var animalst1 = ['🐈','🐀','🐢','🐓','🐅','🐃','🐏','🐪','🦙','🐊','🦖','🐡','🐌','🦕','🦗','🦃','🐦','🦘','🦜','🏃'] // 1 point 70%
var animalst2 = ['🐘','🐕','🐄','🐎','🐛','🐋','🦨'] // 2 points 15%
var animalst3 = ['🦛','🐖','🐁'] // 3 points 10%
var animalst4 = ['🐒'] // 6 points 5%
var animalst5 = ['kamelPIPI '] //+10 points 1%

//var allAnimals = [animalst1,animalst2,animalst3,animalst4];

opts = ({
	options: { 
        debug: false, 
        skipMembership: true, 
        skipUpdatingEmotesets: true, 
        joinInterval: 300, 
        updateEmotesetsTimer: 0
    },
	identity: {
		username: '03h8',
		password: process.env.TWITCH_OAUTH_TOKEN
	},
    connection: {
        secure: true,
        reconnect: true
    },
	channels: ['03h7','kamet0']
});

let client = pb.wrap(new tmi.Client(opts));

client.setMessageCountLimit(2);
client.setMessageCountDuration(900);
client.setLowPriorityTimeout(0.1);
client.setMessageCountDurationBuffer(5);

client.connect();

client.on('message', (channel, tags, message, self) => {
	// Ignore echoed messages.
	//if(self) return;

    var msg = message.trim();
    var name = `@${tags.username}`;
    var weightedRandom;
    var parsedWeightedRandom;

    /*
    switch(tags['message-type']) {
        case "chat":
            */
            if(msg.toLowerCase() === '!prout') {
                weightedRandom = weightedRand({0:0.01, 1:0.68, 2:0.15, 3:0.10, 4:0.05, 5:0.01});
                parsedWeightedRandom = Number.parseInt(weightedRandom);
                //console.log(weightedRandom(1,5));
                switch(parsedWeightedRandom) {
                    case 0:
                        let animalt0 = animalst0[Math.floor(Math.random() * animalst0.length)];
                        client.say(channel,`@${tags.username}` + ", " + `${animalt0} 💨`, 0);       
                        break;                 
                    case 1:
                        let animalt1 = animalst1[Math.floor(Math.random() * animalst1.length)];
                        client.say(channel,`@${tags.username}` + ", " + `${animalt1}💨`, 0);
                        break;
                    case 2:
                        let animalt2 = animalst2[Math.floor(Math.random() * animalst2.length)];
                        client.say(channel,`@${tags.username}` + ", " + `${animalt2}💨`, 0);
                        break;
                    case 3:
                        let animalt3 = animalst3[Math.floor(Math.random() * animalst3.length)];
                        client.say(channel,`@${tags.username}` + ", " + `${animalt3}💨`, 0);
                        break;
                    case 4:
                        let animalt4 = animalst4[Math.floor(Math.random() * animalst4.length)];
                        client.say(channel,`@${tags.username}` + ", " + `${animalt4}💨`, 0);
                        break;
                    case 5:
                        let animalt5 = animalst5[Math.floor(Math.random() * animalst5.length)];
                        client.say(channel,`@${tags.username}` + ", " + `${animalt5} 💨`, 0);
                        break;
                }
                //let animal = animaux[Math.floor(Math.random() * animaux.length)];
                //client.say(channel,`@${tags.username}` + ", " + `${animal}💨`, 0);
                //client.say(channel,`${animal}💨`, 0);
                //console.log(randomDelay);
            }
            
            if(name==="@03h8"){
                //const d = new Date();

                //var randomDelay = 0;
                //var randomDelay = getRandomInt();

                var tier = 0;
                //console.log(randomDelay);
                
                //client.setMessageCountDuration(0);
                //client.setMessageCountDuration(randomDelay);
                
                //console.log(Math.round(randomDelay/60) + "m~ "+randomDelay+ "s / " + d);
                
                //console.log(message);
                
                let messageName = message.substring(
                    message.indexOf("@") + 1, 
                    message.lastIndexOf(",")
                );
                var d = new Date();
                //console.log(randomDelay + "s " + messageName+ " : " + d);*
                console.log("600s " + messageName+ " : " + d);
                //console.log(messageName);
                var messageNameArray = messageName.split();
                //console.log(messageNameArray[0])
                
                for(let i=0;i<=animalst1.length;i++){ 
                    if(msg.indexOf('kamelKot')>0){
                        //console.log("in 4");
                        console.log("Tier "+0);
                        tier=0;
                        break;
                    }
                    if(msg.indexOf([animalst1[i]])>0){
                        //console.log("in 1");
                        console.log("Tier "+1);
                        tier=1;
                        break;
                    }
                    if(msg.indexOf([animalst2[i]])>0){
                        //console.log("in 2");
                        console.log("Tier "+2);
                        tier=2;
                        break;
                    }
                    if(msg.indexOf([animalst3[i]])>0){
                        //console.log("in 3");
                        console.log("Tier "+3);
                        tier=3;
                        break;
                    }
                    if(msg.indexOf([animalst4[i]])>0){
                        //console.log("in 4");
                        console.log("Tier "+4);
                        tier=4;
                        break;
                    }
                    if(msg.indexOf('kamelPIPI')>0){
                        //console.log("in 4");
                        console.log("Tier "+5);
                        tier=5;
                        break;
                    }
                }
                //insertNewUserQuery(insertNewUser, [messageNameArray,1]);

                /*
                try{
                    insertNewUserQuery(insertNewUser, [messageNameArray,1]);
                }catch(err){
                    console.log(err);
                    var score = [];
                    score = getScoreQuery(getScore, messageNameArray);
                    console.log(score);
                    console.log(score.slice(0,1));
                    insertScoreQuery(insertNewScore, [score,messageNameArray])
                    //score.slice(0,1)
                }
                */
            
                //
                // JE SAIS PAS COMMENT CA MARCHE 
                //
                if(!insertNewUserQuery(insertNewUser, [messageNameArray[0],0])){
                    //getScoreQuery(getScore, messageNameArray);
                    //console.log(parsedWeightedRandom);
                    switch(tier){
                        case 0:
                            insertScoreQuery(insertNewScore0, [messageNameArray[0]])
                            break;
                        case 1:
                            insertScoreQuery(insertNewScore1, [messageNameArray[0]])
                            break;
                        case 2:
                            insertScoreQuery(insertNewScore2, [messageNameArray[0]])
                            break;
                        case 3:
                            insertScoreQuery(insertNewScore3, [messageNameArray[0]])
                            break;
                        case 4:
                            insertScoreQuery(insertNewScore4, [messageNameArray[0]])
                            break;
                        case 5:
                            insertScoreQuery(insertNewScore5, [messageNameArray[0]])
                            break;
                    }
                }else{
                    
                }
            }
            //break;
        /*
        case "whisper":
            if(msg.toLowerCase() === '!proutscore') {
                nameWhisp = name.substring(1);
                //console.log(nameWhisp);
                //const msg = whisper.trim();
                //getScoreQuery(getScore,[nameWhisp]);
                console.log(getScoreQuery(getScore,[nameWhisp],self));
                //client.whisper(from,getScoreQuery(getScore,[nameWhisp]));
            }
            break;
            */
    });

/*
client.on("whisper", (from, userstate, whisper, self) => {
    // Don't listen to my own messages..
    if(self) return;
    nameWhisp = from.substring(1);
    console.log(nameWhisp);
    //const msg = whisper.trim();

	if(whisper.toLowerCase() === '!proutscore') {
        //var score = getScoreQuery(getScore,[nameWhisp]);
        client.whisper(from,getScoreQuery(getScore,[nameWhisp]));
    }
});
*/
/*
function weightedRandom(min, max) {
    return Math.round(max / (Math.random() * max + min));
}
*/

function weightedRand(spec) {
  var i, sum=0, r=Math.random();
  for (i in spec) {
    sum += spec[i];
    if (r <= sum) return i;
  }
}

function getRandomInt() {
    min = Math.ceil(60);
    max = Math.floor(900);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

function insertScoreQuery(text,val){
    pool.query(text, val, (err, res) => {
        if (err) {
            console.log("insert score")
            console.log(err.stack)
        } else {
            //console.log(res.rows[0])
        }
        
    })
}

/*

function getScoreQuery(text, val){
    pool.query(text,val, (err, res) => {
        if (err) {
          console.log(err.stack)
        } else {
          console.log(res.rows[0])
          
        }
      })
}

*/

function insertNewUserQuery(text,val){
    pool.query(text, val, (err, res) => {
        if (err) {
            return false;
            console.log("insert user")
            console.log(err)
        } else {
            //console.log(res.rows[0])
            return true;
            
        }
        
    })
}