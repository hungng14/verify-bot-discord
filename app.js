const express = require('express')
const request = require('request')
const app = express()
const bodyParser = require('body-parser');
const Discord = require('discord.js');
const config = require('./config.json')
const client = new Discord.Client();
const { verify } = require('hcaptcha');
const getTemplate = require('./getTemplate');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())
app.use(express.static('public'))
client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on("message", async(message) => {
    if (message.content == "test" && message.author.id == "634387495584268335") {
        const embed = new Discord.MessageEmbed()
            .setTitle("Verification")
            .setDescription(`This server uses an automated reCAPTCHA v2 verification system. [Get Verified](${config.redirect_uri})`)
            .setColor("BLUE")
            .setFooter(client.user.username, client.user.displayAvatarURL())
        message.channel.send(embed);
    }
})

app.get('/', (req, res) => {
    res.redirect('/verify')
})
app.get('/verify', (req, res) => {
    var code = req.query.code
    var options = {
        method: 'POST',
        url: 'https://discord.com/api/oauth2/token',
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
        form: {
            client_id: config.client_id,
            client_secret: config.client_secret,
            grant_type: 'authorization_code',
            code: code,
            redirect_uri: config.redirect_uri,
            scope: 'identify'
        }
    };

    request(options, function(error, response, body) {
        if (error) throw new Error(error);
        var parsed = JSON.parse(body)
        var options = {
            method: 'GET',
            url: 'https://discord.com/api/users/@me',
            headers: { authorization: `Bearer ${parsed.access_token}` }
        };

        request(options, function(error, response, body) {
            if (error) throw new Error(error);
            if (response.statusCode != 200) {
                res.redirect(`https://discord.com/oauth2/authorize?client_id=${config.client_id}&redirect_uri=${config.redirect_uri}&response_type=code&scope=identify`)
                return
            }
            var parsed = JSON.parse(body)
            res.send(
                getTemplate({
                    userid: parsed.id,
                    username: parsed.username,
                    sitekey: config.hcaptchaSikekey
                })
            )
        });
    });
})

app.post('/verify', async(req, res) => {
    try {
        const token = req.body.token;
        const userid = req.body.userid;
        if (!userid) {
            throw new Error('Verification error')
        }
        const verifyToken = await verify(config.hcaptchaSecret, token)
        if (verifyToken.success) {

            const guild = await client.guilds.fetch(config.guild_id)
            const member = await guild.members.fetch(userid)
            member.roles.add(config.verifiedRole_id, `user is verified`)
            const thisUser = await client.users.fetch(userid);
            const logEmbed = new Discord.MessageEmbed()
                .setTitle("Captcha Completed")
                .addField("User", thisUser.tag)
                .setFooter(`User ID: ${userid}`)
                .setColor("GREEN")
            client.channels.cache.get(config.logChannel).send(logEmbed)
            return res.status(200).send({ status: 200, message: 'Verify successfully', data: 'https://discord.com/channels/892763161411874866/905418778106535946' })
        } else {
            console.log(`user ${userid} failed the captcha`)
                // res.redirect('/verify')
            throw new Error('Verification error')
        }
    } catch (error) {
        console.log('error', error)
        return res.status(400).send({ status: 400, message: 'Verification error' })
    }

})

app.listen(process.env.PORT || 3000)
client.login(config.bot_token);