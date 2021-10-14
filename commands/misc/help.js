const { MessageEmbed } = require('discord.js');
const { MessageButton, MessageActionRow } = require('discord-buttons');
const handler = require('../../handlers/message');
const fs = require('fs');
const { join } = require("path");


module.exports = {
    name: 'help',
    aliases: ['h'],
    description: 'List all available commands',
    usage: 'help [ category | command ]',
    async execute(message, args, client) {
        try {
            if (!args[0]) {
                let helpEmbed = new MessageEmbed()
                    .setAuthor('Razer', client.user.displayAvatarURL())
                    .setColor("#0d17f2")
                    .setDescription(`Razer is the easiest way to play music in your Discord server. It supports Spotify, YouTube, Soundcloud and more!
                    
                    To get started, join a voice channel and \`${client.prefixes.get(message.guild.id) ? client.prefixes.get(message.guild.id).prefix : client.defaultPrefix}play\` a song. You can use song names, video links, and playlist links.
                    
                    `)

                const commandFolders = fs.readdirSync(join(__dirname, "..", "..", "commands"))
                let allCategories = []
                commandFolders.forEach((categories, index) => {
                    const counter = index++ + 1;
                    allCategories.push(`${counter}. ${categories} \`${client.prefixes.get(message.guild.id) ? client.prefixes.get(message.guild.id).prefix : client.defaultPrefix}help ${categories}\` `)
                });
                helpEmbed.addField(`Why Razer`,"We provide you the best and updated features without any charges .We provide you 24/7 Mode, Volume control, audio effects and much more for free.")
                helpEmbed.addField("Commands",`For full list of Commands or Type \`${client.prefixes.get(message.guild.id) ? client.prefixes.get(message.guild.id).prefix : client.defaultPrefix}commands\``)
                helpEmbed.addField("Invite",`You can invite me into any server by clicking [Here](https://discord.com/api/oauth2/authorize?client_id=897134128951083070&permissions=139653021504&scope=bot)`)
                helpEmbed.addField("Contact Us",`Contact our developers team by clicking [here](https://discord.gg/sm6tpWqzqJ)`)
                let invbutton2 = new MessageButton()
                .setStyle('url')
                .setLabel('Invite Me !')
                .setURL('https://discord.com/api/oauth2/authorize?client_id=897134128951083070&permissions=139653021504&scope=bot')
                let invbutton4 = new MessageButton()
                .setStyle('url')
                .setLabel('Contact Us !')
                .setURL('https://discord.gg/sm6tpWqzqJ');
                return message.channel.send({ embed: helpEmbed , button: [invbutton2 , invbutton4 ] })
            } else {
                let helpEmbed = new MessageEmbed()
                    .setAuthor('Help', client.user.displayAvatarURL())
                    .setColor([245, 245, 245, 1])
                    .setDescription(`My current prefix in **${message.guild.name}** is \`${client.prefixes.get(message.guild.id) ? client.prefixes.get(message.guild.id).prefix : client.defaultPrefix}\``)

                let commandFile, category, error;
                try {
                    commandFile = fs.readdirSync(join(__dirname, '..', '..', 'commands', `${args[0]?.toLowerCase()}`)).filter((file) => file.endsWith(".js"));
                    category = true;
                } catch (err) {
                    if (client.commands.find(x => x.name == args[0]?.toLowerCase() || x.aliases && x.aliases.includes(args[0]?.toLowerCase()))) {
                        commandFile = client.commands.find(x => x.name == args[0]?.toLowerCase() || x.aliases && x.aliases.includes(args[0]?.toLowerCase()))
                        category = false;
                    } else {
                        error = true
                    }
                }
                if (error) return message.channel.send(new handler().normalEmbed(`No category or command was found!`))
                if (category) {
                    helpEmbed.addField(`${args[0]?.toLowerCase()} [${commandFile.length}]`, '```' + commandFile.join(', ').replace(/.js/gi, '') + '```')
                
                } else {
                    helpEmbed.addField(`Name`, `${commandFile.name ? commandFile.name : "unknown"}`, true)
                    helpEmbed.addField(`Aliases`, `${(commandFile.aliases && commandFile.aliases.length != 0) ? commandFile.aliases.join(', ') : "-"}`, true)
                    helpEmbed.addField(`Usage`, `${client.prefixes.get(message.guild.id) ? client.prefixes.get(message.guild.id).prefix : client.defaultPrefix}${commandFile.usage ? commandFile.usage : "-"}`, true)
                    helpEmbed.addField(`Description`, `${commandFile.description ? commandFile.description : "-"}`)
                
                   message.channel.send(helpEmbed)
                }
            }
        } catch (err) {
            message.channel.send(new handler().normalEmbed(`Error! ${err}`))
        }
    }
}