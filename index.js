const { Client } = require('discord.js-selfbot-v13');
let captcha = require('2captcha');
const client = new Client({
    checkUpdate:false
});

client.on('ready', async ()=>{
    let oldMinute = new Date;
    oldMinute = oldMinute.getMinutes();
    setInterval(async () => {
        let currentMinute = new Date;
        currentMinute = currentMinute.getMinutes();
        if(currentMinute != oldMinute){
            console.log(`Minute has changed, updating...`);
            oldMinute = currentMinute;
            let bio = client.user.bio;
            let currentTime = Date.now();
            let h = new Date(currentTime).getHours();
            let m = new Date(currentTime).getMinutes();
            let sliceOfDay = h >= 12 ? 'PM' : 'AM';
            h = (h % 12) || 12;
            m = (m<10) ? '0' + m : m;
            let output = h + ':' + m;
            currentTime = currentTime.toString().substring(0,10);
            bio = bio.split(`\``);
            bio[bio.length - 1] = bio[bio.length - 1].replace(/(?<=\:)(.*?)(?=\:)/g, currentTime);
            bio = bio.join(`\``);
            bio = bio.replace(/(?<=\`)(.*?)(?=\`)/g, `${output} ${sliceOfDay}`);
            try{
                await client.user.setAboutMe(bio);
            }catch(e){
                console.log(e);
                process.exit();
            }
            console.log(bio);
        }
        console.log(`Curernt time: ${currentMinute}`)
    }, 1000 * 1);
});

process.on('unhandledRejection', error => console.error('Uncaught Promise Rejection', error));

client.login('Not my token, lol');
