const http = require('http');
const express = require('express');
const app = express();
var server = http.createServer(app);

app.get('/', (request, response) => {
	console.log(`BY : ZombieX#0001 and KARAR#2021`);
	response.writeHead(200, { 'Content-Type': 'text/plain' });
	response.end('By : ZombieX#0001 and KARAR#2021');
});

const Discord = require('discord.js');
const client = new Discord.Client();
const Database = require('st.db');
const db = new Database(`channels`);

/////////Settings
const prefix = "Your Prefix"
const link = "Your Link Project"
/////////



const listener = server.listen(process.env.PORT, function() {
	console.log(`Your app is listening on port ` + listener.address().port);
});

const YouTubeNotifier = require('youtube-notification');
client.on('ready', () => {
	client.user.setActivity(`${prefix}help`, {
		type: 'PLAYING'
	});
});
const notifier = new YouTubeNotifier({
	hubCallback: `${link}/yt`,
	secret: 'ZombieX'
});

notifier.on('notified', data => {
	const chid = db.fetch('room');
	const msgg = db.fetch('message');
	const ch = client.channels.cache.get(chid);

	ch.send(`** \`${data.channel.name}\`
	${msgg} 
	
	${data.video.link}**`);
});

notifier.subscribe(db.fetch('ch1'));
notifier.subscribe(db.fetch('ch2'));
notifier.subscribe(db.fetch('ch3'));
notifier.subscribe(db.fetch('ch4'));
notifier.subscribe(db.fetch('ch5'));
notifier.subscribe(db.fetch('ch6'));
notifier.subscribe(db.fetch('ch7'));
notifier.subscribe(db.fetch('ch8'));
notifier.subscribe(db.fetch('ch9'));
notifier.subscribe(db.fetch('ch10'));

client.on('message', async message => {
	if (message.content.startsWith(prefix + 'set-message')) {
		if (!message.member.hasPermission('MANAGE_CHANNELS'))
			return message.channel.send(
				`** don't havepermission! \`MANAGE_CHANNELS\`🙄 **`
			);
		const msg = message.content
			.split(' ')
			.slice(1)
			.join(' ');
		if (!msg)
			return message.channel.send(
				new Discord.MessageEmbed()
					.setColor('#FF0000')
					.setTitle('Please Write Message')
					.addField(
						'Example',
						prefix + 'set-message has been uploaded new Video'
					)
			);

		db.set('message', msg);
		const msg1 = new Discord.MessageEmbed()
			.setThumbnail(client.user.avatarURL())
			.setColor('#FF0000').setDescription(`**The message has been selected**
 
****"****"**__${msg}__**"****"****
 
**BY ${message.author.tag}**`);
		message.channel.send(msg1);
	}
});

client.on('message', async message => {
	if (message.content.startsWith(prefix + 'set-room')) {
		if (!message.member.hasPermission('MANAGE_CHANNELS'))
			return message.channel.send(
				`** don't havepermission! \`MANAGE_CHANNELS\`🙄 **`
			);
		const room = message.mentions.channels.first();

		if (!room)
			return message.channel.send(
				new Discord.MessageEmbed()
					.setColor('#FF0000')
					.setTitle('Please Mention Channel ')
					.addField('Example', prefix + 'set-room #chat')
			);
		db.set('room', room.id);
		message.channel.send(
			new Discord.MessageEmbed()
				.setThumbnail(client.user.avatarURL())
				.setColor('#FF0000')
				.setDescription(`**Done Selected Channel :**\n ${room}`)
		);
	}
});

client.on('message', message => {
	if (message.content === prefix + 'info') {
		const ch1 = db.fetch('ch1');
		const ch2 = db.fetch('ch2');
		const ch3 = db.fetch('ch3');
		const ch4 = db.fetch('ch4');
		const ch5 = db.fetch('ch5');
		const ch6 = db.fetch('ch6');
		const ch7 = db.fetch('ch7');
		const ch8 = db.fetch('ch8');
		const ch9 = db.fetch('ch9');
		const ch10 = db.fetch('ch10');
		const room = db.fetch('room');
		const msg = db.fetch('message');
		const embed = new Discord.MessageEmbed()
			.setTitle(
				'Info',
				'https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/YouTube_full-color_icon_%282017%29.svg/800px-YouTube_full-color_icon_%282017%29.svg.png '
			)
			.setColor('#FF0000')
			.addField('ID Channel 1', ch1, true)
			.addField('ID Channel 2', ch2, true)
			.addField('ID Channel 3', ch3, true)
			.addField('ID Channel 4', ch4, true)
			.addField('ID Channel 5', ch5, true)
			.addField('ID Channel 6', ch6, true)
			.addField('ID Channel 7', ch7, true)
			.addField('ID Channel 8', ch8, true)
			.addField('ID Channel 9', ch9, true)
			.addField('ID Channel 10', ch10, true)
			.addField('YouTube Room', room, true)
			.addField('The Message', msg, true)
			.setFooter('Developer :!ZombieX#0001 & KARAR#2021');

		message.channel.send(embed);
	}
});

client.on('message', message => {
	if (message.content === prefix + 'help') {
		const embed = new Discord.MessageEmbed()
			.setAuthor(
				'Commands :',
				'https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/YouTube_full-color_icon_%282017%29.svg/800px-YouTube_full-color_icon_%282017%29.svg.png'
			)
			.setThumbnail(client.user.avatarURL())
			.setColor('#ff0000')
			.addField(
				`${prefix}set-ch`,
				`To Add New Channel \n **Example : ${prefix}set-ch[1...10] UC0A5FZItuziL5iWIinQeKcQ**`
			)
			.addField(`${prefix}set-room`, 'To Select YouTube Room')
			.addField(`${prefix}set-message`, 'To Change Message YouTube Post')
			.addField(`${prefix}rest`, 'To Remove All Database')
			.addField(
				`${prefix}info`,
				'To preview (Channels, YouTube room, Message YouTube Post)'
			)
			.setFooter('Developer :!ZombieX#0001 & KARAR#2021');
		message.channel.send(embed);
	}
});

client.on('message', message => {
	if (message.content === prefix + 'rest') {
		if (!message.member.hasPermission('MANAGE_CHANNELS'))
			return message.channel.send(
				`** don't havepermission! \`MANAGE_CHANNELS\`🙄 **`
			);
		message.react('✅');
		message.react('❎');

		// Filters
		const yesFilter = (reaction, user) =>
			reaction.emoji.name === '✅' && user.id === message.author.id;
		const noFilter = (reaction, user) =>
			reaction.emoji.name === '❎' && user.id === message.author.id;

		const yes = message.createReactionCollector(yesFilter, { timer: 6000 });
		const no = message.createReactionCollector(noFilter, { timer: 6000 });
		yes.on('collect', (r, u) => {
			message.channel.send('Loading').then(msg => {
				setTimeout(function() {
					msg.edit('Loading.');
				}, 1000);
				setTimeout(function() {
					msg.edit('Loading..');
				}, 2000);
				setTimeout(function() {
					msg.edit('Loading...');
				}, 3000);
				setTimeout(function() {
					msg.edit('Loading.');
				}, 4000);
				setTimeout(function() {
					msg.edit('Loading..');
				}, 5000);
				setTimeout(function() {
					msg.edit('Loading...');
				}, 6000);
				setTimeout(function() {
					msg.edit('Loading.');
				}, 7000);
				setTimeout(function() {
					msg.edit('Loading..');
				}, 8000);
				setTimeout(function() {
					msg.edit('Loading...');
				}, 9000);
				setTimeout(function() {
					msg.edit('Loading.');
				}, 10000);
				setTimeout(function() {
					msg.edit('Loading..');
				}, 11000);
				setTimeout(function() {
					msg.edit('Loading...');
				}, 12000);
				setTimeout(function() {
					db.set('ch1', 'none');
				}, 10000);
				setTimeout(function() {
					db.set('ch2', 'none');
				}, 11000);
				setTimeout(function() {
					db.set('ch3', 'none');
				}, 12000);
				setTimeout(function() {
					db.set('ch4', 'none');
				}, 13000);
				setTimeout(function() {
					db.set('ch5', 'none');
				}, 14000);
				setTimeout(function() {
					db.set('ch6', 'none');
				}, 15000);
				setTimeout(function() {
					db.set('ch7', 'none');
				}, 16000);
				setTimeout(function() {
					db.set('ch8', 'none');
				}, 17000);
				setTimeout(function() {
					db.set('ch9', 'none');
				}, 18000);
				setTimeout(function() {
					db.set('ch10', 'none');
				}, 19000);
				setTimeout(function() {
					db.set('message', 'New Video');
				}, 20000);
				setTimeout(function() {
					db.set('room', 'none');
				}, 21000);
				setTimeout(function() {
					msg.edit(`${message.author}, Done Restarting Database`);
				}, 22000);
			});
		});

		no.on('collect', (r, u) => {
			message.delete();
		});
	}
});

client.on('message', async message => {
	if (message.content.startsWith(prefix + 'set-ch1')) {
		if (!message.member.hasPermission('MANAGE_CHANNELS'))
			return message.channel.send(
				`** don't havepermission! \`MANAGE_CHANNELS\`🙄 **`
			);
		const idch = message.content
			.split(' ')
			.slice(1)
			.join(' ');
		if (!idch)
			return message.channel.send(
				new Discord.MessageEmbed()
					.setColor('#ff0000')
					.setDescription(
						`Please write Id Channel YouTube \n **Example : ${prefix}set-ch1 UC0A5FZItuziL5iWIinQeKcQ** `
					)
			);
		const embed = new Discord.MessageEmbed()
			.setColor('#ff0000')
			.setDescription('Done Change Channel YouTube');
		message.channel.send(embed);
		db.set('ch1', idch);
	}
	if (message.content.startsWith(prefix + 'set-ch2')) {
		if (!message.member.hasPermission('MANAGE_CHANNELS'))
			return message.channel.send(
				`** don't havepermission! \`MANAGE_CHANNELS\`🙄 **`
			);
		const idch = message.content
			.split(' ')
			.slice(1)
			.join(' ');
		if (!idch)
			return message.channel.send(
				new Discord.MessageEmbed()
					.setColor('#ff0000')
					.setDescription(
						`Please write Id Channel YouTube \n **Example : ${prefix}set-ch2 UC0A5FZItuziL5iWIinQeKcQ** `
					)
			);
		const embed = new Discord.MessageEmbed()
			.setColor('#ff0000')
			.setDescription('Done Change Channel YouTube');
		message.channel.send(embed);
		db.set('ch2', idch);
	}
	if (message.content.startsWith(prefix + 'set-ch3')) {
		if (!message.member.hasPermission('MANAGE_CHANNELS'))
			return message.channel.send(
				`** don't havepermission! \`MANAGE_CHANNELS\`🙄 **`
			);
		const idch = message.content
			.split(' ')
			.slice(1)
			.join(' ');
		if (!idch)
			return message.channel.send(
				new Discord.MessageEmbed()
					.setColor('#ff0000')
					.setDescription(
						`Please write Id Channel YouTube \n **Example : ${prefix}set-ch3 UC0A5FZItuziL5iWIinQeKcQ** `
					)
			);
		const embed = new Discord.MessageEmbed()
			.setColor('#ff0000')
			.setDescription('Done Change Channel YouTube');
		message.channel.send(embed);
		db.set('ch3', idch);
	}
	if (message.content.startsWith(prefix + 'set-ch4')) {
		if (!message.member.hasPermission('MANAGE_CHANNELS'))
			return message.channel.send(
				`** don't havepermission! \`MANAGE_CHANNELS\`🙄 **`
			);
		const idch = message.content
			.split(' ')
			.slice(1)
			.join(' ');
		if (!idch)
			return message.channel.send(
				new Discord.MessageEmbed()
					.setColor('#ff0000')
					.setDescription(
						`Please write Id Channel YouTube \n **Example : ${prefix}set-ch4 UC0A5FZItuziL5iWIinQeKcQ** `
					)
			);
		const embed = new Discord.MessageEmbed()
			.setColor('#ff0000')
			.setDescription('Done Change Channel YouTube');
		message.channel.send(embed);
		db.set('ch4', idch);
	}
	if (message.content.startsWith(prefix + 'set-ch5')) {
		if (!message.member.hasPermission('MANAGE_CHANNELS'))
			return message.channel.send(
				`** don't havepermission! \`MANAGE_CHANNELS\`🙄 **`
			);
		const idch = message.content
			.split(' ')
			.slice(1)
			.join(' ');
		if (!idch)
			return message.channel.send(
				new Discord.MessageEmbed()
					.setColor('#ff0000')
					.setDescription(
						`Please write Id Channel YouTube \n **Example : ${prefix}set-ch5 UC0A5FZItuziL5iWIinQeKcQ** `
					)
			);
		const embed = new Discord.MessageEmbed()
			.setColor('#ff0000')
			.setDescription('Done Change Channel YouTube');
		message.channel.send(embed);
		db.set('ch5', idch);
	}
	if (message.content.startsWith(prefix + 'set-ch6')) {
		if (!message.member.hasPermission('MANAGE_CHANNELS'))
			return message.channel.send(
				`** don't havepermission! \`MANAGE_CHANNELS\`🙄 **`
			);
		const idch = message.content
			.split(' ')
			.slice(1)
			.join(' ');
		if (!idch)
			return message.channel.send(
				new Discord.MessageEmbed()
					.setColor('#ff0000')
					.setDescription(
						`Please write Id Channel YouTube \n **Example : ${prefix}set-ch6 UC0A5FZItuziL5iWIinQeKcQ** `
					)
			);
		const embed = new Discord.MessageEmbed()
			.setColor('#ff0000')
			.setDescription('Done Change Channel YouTube');
		message.channel.send(embed);
		db.set('ch6', idch);
	}
	if (message.content.startsWith(prefix + 'set-ch7')) {
		if (!message.member.hasPermission('MANAGE_CHANNELS'))
			return message.channel.send(
				`** don't havepermission! \`MANAGE_CHANNELS\`🙄 **`
			);
		const idch = message.content
			.split(' ')
			.slice(1)
			.join(' ');
		if (!idch)
			return message.channel.send(
				new Discord.MessageEmbed()
					.setColor('#ff0000')
					.setDescription(
						`Please write Id Channel YouTube \n **Example : ${prefix}set-ch7 UC0A5FZItuziL5iWIinQeKcQ** `
					)
			);
		const embed = new Discord.MessageEmbed()
			.setColor('#ff0000')
			.setDescription('Done Change Channel YouTube');
		message.channel.send(embed);
		db.set('ch7', idch);
	}
	if (message.content.startsWith(prefix + 'set-ch8')) {
		if (!message.member.hasPermission('MANAGE_CHANNELS'))
			return message.channel.send(
				`** don't havepermission! \`MANAGE_CHANNELS\`🙄 **`
			);
		const idch = message.content
			.split(' ')
			.slice(1)
			.join(' ');
		if (!idch)
			return message.channel.send(
				new Discord.MessageEmbed()
					.setColor('#ff0000')
					.setDescription(
						`Please write Id Channel YouTube \n **Example : ${prefix}set-ch8 UC0A5FZItuziL5iWIinQeKcQ** `
					)
			);
		const embed = new Discord.MessageEmbed()
			.setColor('#ff0000')
			.setDescription('Done Change Channel YouTube');
		message.channel.send(embed);
		db.set('ch8', idch);
	}
	if (message.content.startsWith(prefix + 'set-ch9')) {
		if (!message.member.hasPermission('MANAGE_CHANNELS'))
			return message.channel.send(
				`** don't havepermission! \`MANAGE_CHANNELS\`🙄 **`
			);
		const idch = message.content
			.split(' ')
			.slice(1)
			.join(' ');
		if (!idch)
			return message.channel.send(
				new Discord.MessageEmbed()
					.setColor('#ff0000')
					.setDescription(
						`Please write Id Channel YouTube \n **Example : ${prefix}set-ch9 UC0A5FZItuziL5iWIinQeKcQ** `
					)
			);
		const embed = new Discord.MessageEmbed()
			.setColor('#ff0000')
			.setDescription('Done Change Channel YouTube');
		message.channel.send(embed);
		db.set('ch9', idch);
	}
	if (message.content.startsWith(prefix + 'set-ch10')) {
		if (!message.member.hasPermission('MANAGE_CHANNELS'))
			return message.channel.send(
				`** don't havepermission! \`MANAGE_CHANNELS\`🙄 **`
			);
		const idch = message.content
			.split(' ')
			.slice(1)
			.join(' ');
		if (!idch)
			return message.channel.send(
				new Discord.MessageEmbed()
					.setColor('#ff0000')
					.setDescription(
						`Please write Id Channel YouTube \n **Example : ${prefix}set-ch10 UC0A5FZItuziL5iWIinQeKcQ** `
					)
			);
		const embed = new Discord.MessageEmbed()
			.setColor('#ff0000')
			.setDescription('Done Change Channel YouTube');
		message.channel.send(embed);
		db.set('ch10', idch);
	}
});

app.use('/yt', notifier.listener());

client.login(process.env.token);
