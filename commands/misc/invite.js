const { MessageButton, MessageActionRow } = require('discord-buttons');
const { MessageEmbed } = require('discord.js');
module.exports = {
    name: 'invite',
    aliases: ['inv'],
    usage: 'invite',
    description: 'Give you a link to invite this bot',
    async execute(message , client) {
       
                let invbutton = new MessageButton()
                .setStyle('url')
                .setLabel('Invite Me !')
                .setURL('https://discord.com/api/oauth2/authorize?client_id=897134128951083070&permissions=20442432&scope=bot')

                let invbutton5 = new MessageButton()
                .setStyle('url')
                .setLabel('Support Server !')
                .setURL('https://discord.gg/tVwcStkhy2');

                const invitemsg = new MessageEmbed()
               
                .setColor('#0d17f2')
                .setAuthor(' | Here Are The Invite Links', message.author.displayAvatarURL({ dynamic: true }))
                
              
        message.channel.send({ embed: invitemsg , button: [invbutton , invbutton5] });
    }
}