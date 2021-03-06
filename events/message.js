const { MessageEmbed } = require('discord.js');
const { PREFIX, LOG_USAGE } = new (require('../modules/melonUtils'))();
const chalk = require('chalk');

module.exports = {
    name: 'message',
    once: false,
    async execute(message, client) {
        if (!message.guild) return;
        if (message.author.bot) return;
        const escapeRegex = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
        let command, args, prefix;
        let intro = new MessageEmbed()
           .setAuthor('Razer ', client.user.displayAvatarURL())
           .setDescription(`• My prefix for this server is  \`${client.prefixes.get(message.guild.id) ? client.prefixes.get(message.guild.id).prefix : PREFIX}\`
           • You can play music by joining a voice channel and typing \`${client.prefixes.get(message.guild.id) ? client.prefixes.get(message.guild.id).prefix : PREFIX}play\``)
                .setColor('#f51212')
        if (message.content == `<@!${client.user.id}>` || message.content == `<@${client.user.id}>`) {
            if (!message.channel.permissionsFor(client.user).has('SEND_MESSAGES')) return message.member.send('Hey, i need `SEND_MESSAGES` permission to do interaction with user.').catch((_) => { })
            return message.channel.send(intro)
        }

        if (!message.content) return;

        if (client.prefixes.get(message.guild.id)?.prefix) {
            prefix = client.prefixes.get(message.guild.id).prefix
            const prefixRegex = new RegExp(`^(<@!?${client.user.id}>|${escapeRegex(prefix)})\\s*`);
            if (!prefixRegex.test(message.content)) return;
            const [, matchedPrefix] = message.content.match(prefixRegex);

            args = message.content.slice(matchedPrefix.length).trim().split(/ +/);
            const commandName = args.shift().toLowerCase();
            command = client.commands.get(commandName) || client.commands.find(x => x.aliases && x.aliases.includes(commandName));

        } else {
            prefix = PREFIX
            const prefixRegex = new RegExp(`^(<@!?${client.user.id}>|${escapeRegex(prefix)})\\s*`);
            if (!prefixRegex.test(message.content)) return;
            const [, matchedPrefix] = message.content.match(prefixRegex);

            args = message.content.slice(matchedPrefix.length).trim().split(/ +/);
            const commandName = args.shift().toLowerCase();
            command = client.commands.get(commandName) || client.commands.find(x => x.aliases && x.aliases.includes(commandName));
        }
        if (!command) return;
        if (!message.channel.permissionsFor(client.user).has('SEND_MESSAGES')) return message.member.send('Hey, i need `SEND_MESSAGES` permission to do interaction with user.').catch((_) => { })

        try {
            if (LOG_USAGE) {
                console.log(chalk.magenta(`[LOG] => [COMMANDS] ${message.author.tag} (${message.author.id}) : ${message.content}`))
            }
            await command.execute(message, args, client)
        } catch (err) {
            const errorEmbed = new MessageEmbed()
                .setDescription(`I'm sorry, there was an error while executing **${command.name}**\n\`\`\`${err}\`\`\``)
                .setColor(client.guilds.cache.get(message.guild.id).me.displayHexColor != '#000000' ? client.guilds.cache.get(message.guild.id).me.displayHexColor : '#00C7FF')
            message.channel.send(errorEmbed)
            client.logger.error(err)
        }
    }
};