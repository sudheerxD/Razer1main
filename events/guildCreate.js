const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'guildCreate',
    once: false,
    async execute(guild, client) {
         let serverintro = new MessageEmbed()
                .setAuthor('Thanks for adding me to your server! 😊',"https://images-ext-2.discordapp.net/external/74WvCSVtS3UOhoZEvM_iJJoQ6zJjcgIylfJKRUsgVRQ/%3Fsize%3D256/https/cdn.discordapp.com/avatars/897134128951083070/b1dc40e4eca89d9395e49914b2c8d72d.png")
                .setDescription(`You can play music by joining a voice channel and typing \`$play\` You can use song names, video links, and playlist links.

If you have any questions or need help with Razer, click Buttons to talk to our support team!`)
                .setColor('#f51212')        

        let defaultChannel;
        guild.channels.cache.forEach((channel) => {
            if(channel.type == 'text' && !defaultChannel) {
                if(channel.permissionsFor(guild.me).has(['SEND_MESSAGES', 'VIEW_CHANNEL', 'EMBED_LINKS'])) {
                    defaultChannel = channel;
                }
            }
        });
        defaultChannel.send(serverintro).catch(()=>{})}
};