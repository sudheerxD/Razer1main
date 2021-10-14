const { get, set, reset } = require('../../functions/prefix');
const { MessageEmbed } = require('discord.js');
const handler = require('../../handlers/message');

module.exports = {
    name: 'prefix',
    description: 'Set/get prefix',
    permissions: [`MANAGE_GUILD`],
    usage: 'prefix [ new prefix ]',
    async execute(message, args, client) {
        
        const member = message.mentions.members.last() ? message.mentions.members.last() : args[0];

       if(!message.member.hasPermission("MANAGE_GUILD")) return message.reply(`You don't have enough powers to Use This Command`)
        if (!client.database) return message.channel.send(new handler().normalEmbed('Please ask developer to give a valid MongoDB URI.'))
        const opt = args[0]
        const newPrefix = args[1]

        switch (opt) {
            case 'set': {
                if (!newPrefix) return message.channel.send(new handler().noArgument(client, this.name, ['prefix set < new prefix >', 'reset']))
                set(client, message.guild.id, newPrefix).then(x => {
                    if (!x.error) return message.channel.send(new handler().normalEmbed('<a:correct:862172367786475520> Successfully changed the prefix to ' + newPrefix))
                })
                break;
            }

            case 'reset': {
                reset(client, message.guild.id).then(x => {
                    if (x.error) return message.channel.send(new handler().normalEmbed('There\'s no custom prefix was saved'))
                    return message.channel.send(new handler().normalEmbed('<a:correct:862172367786475520> Successfully reset the prefix'))
                })
                break;
            }

            default: {
                get(message.guild.id).then(x => {
                    return message.channel.send(new handler().normalEmbed(`<a:correct:862172367786475520> My current prefix on **${message.guild.name}** is ${x.error ? client.defaultPrefix : x.prefix}\n\n\`${x.error ? client.defaultPrefix : x.prefix}prefix set\` to set a new prefix`))
                })
                break
            }
        }
    }
}