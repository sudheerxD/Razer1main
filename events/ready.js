const lavalink = require('../lavalink/index');
const chalk = require('chalk');
const { Util } = require('discord.js');

module.exports = {
    name: 'ready',
    once: true,
    async execute(client) {
        const player = new lavalink(client)
        client.player = player
        player.init(client.user.id)
        client.user.setActivity(`${client.defaultPrefix}help | ${client.guilds.cache.size} guild${client.guilds.cache.size <= 1 ? '' : 's'}`)
        setInterval(() => {
            let statusList = [
                `@Razer `,
                `${client.defaultPrefix}help`,
            ]
            let choosenStatus = statusList[Math.round(Math.random() * statusList.length)]
            client.user.setActivity(choosenStatus, { type: 3 })
        }, 40 * 1000);
        console.log(chalk.green(`[CLIENT] => [READY] ${client.user.tag} is now ready!`))
        await Util.delayFor(800)
        client.on('raw', (d) => player.updateVoiceState(d))
    }
};