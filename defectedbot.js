var Discord = require("discord.js");
var client = new Discord.Client();
var channel = new Discord.Channel();
var warBases=[];

// Create a War Object

function currentWar(){
	this.clanName = "";
	this.size;
	this.active = false;
}

currentWar.prototype.isActive = function () {
	return this.active;
};

// Set up a Base Object

function Base(rank) {
	this.rank = rank;
	this.stars = 0;
	this.called = false;
	this.calledBy = "";
}

Base.prototype.isCalled = function () {
	return this.called;
};

// Create array of Base objects to simulate a War

function startWar(warSize, enemyName) {
	for (var i=0; i<warSize; i++){
		warBases.push({ rank: i })
	}
	currentWar.clanName = enemyName;
	currentWar.size = warSize;
	currentWar.active = true;
}

client.on("message", msg => {
	// Set the bot's prefix
	let prefix = "/"

	if (!msg.content.startsWith(prefix)) return;

  else if (msg.content.startsWith(prefix + "Tom")) {
		msg.channel.sendMessage("likes big black dicks!")
			.then(message=>console.log(`Sent message: ${message.content}`))
			.catch(console.error);
  }
  else if (msg.content.startsWith(prefix + "Marcus")) {
		msg.channel.sendMessage("is a god among men!")
			.then(message=>console.log(`Sent message: ${message.content}`))
			.catch(console.error);
 	}
	else if(msg.content.startsWith(prefix + "start war")) {
		let args = msg.content.split(" ");
		let numberOfBases = args[2];
		let enemyName = args[3];

		if (currentWar.active){
			msg.channel.sendMessage(`We are at war with ${currentWar.enemyName}!`)
			.then(message=>console.log(`Sent message: ${message.content}`))
			.catch(console.error);
			return;

		}

		if (args.length > 3)
			for (var i=4; i < args.length; i++)
				enemyName = enemyName + " " + args[i];
		msg.channel.sendMessage(`War started against ${enemyName}.`)
			.then(message => console.log(`Sent message: ${message.content}`))
			.catch(console.error);
		startWar(numberOfBases, enemyName);
	}
	else if(msg.content.startsWith(prefix + "call")){
		let args = msg.content.split(" ");
		let baseCalled = args[1];
		// Correct for off by 1
		baseCalled--;
		if (warBases[baseCalled].called)
			msg.channel.sendMessage(`#${args[1]} already called by ${warBases[baseCalled].calledBy}. Try again.`)
			.then(message=>console.log(`Sent message: ${message.content}`))
			.catch(console.error);
		else {
			warBases[baseCalled].called = true;
			warBases[baseCalled].calledBy = msg.author;
			msg.channel.sendMessage(`Called ${args[1]} for ${msg.author}!`)
			.then(message=>console.log(`Sent message: ${message.content}`))
			.catch(console.error);
		}
	}
	else if (msg.content.startsWith(prefix + "attacked")) {
		let args = msg.content.split(" ");
		let baseAttacked = args[1];
		// Correct for off by 1
		baseAttacked--;
		let numberOfStars = args[3];

		warBases[baseAttacked].stars = numberOfStars;
		if (warBases[baseAttacked].called){
			warBases[baseAttacked].called = false;
		}

		msg.channel.sendMessage(`Logged ${numberOfStars} on #${args[1]}!`)
		.then(message=>console.log(`Sent message: ${message.content}`))
		.catch(console.error);

		if (numberOfStars == 3){
			msg.channel.sendMessage(`Way to not suck!`)
			.then(message=>console.log(`Sent message: ${message.content}`))
			.catch(console.error);
		}
	}
	else if (msg.content.startsWith(prefix + "delete call")) {
		let args = msg.content.split(" ");
		let deleteBase = args[2];
		// Correct for off by 1
		deleteBase--;
		warBases[deleteBase].called=false;
		msg.channel.sendMessage(`Deleted call on #${args[2]}!`)
		.then(message=>console.log(`Sent message: ${message.content}`))
		.catch(console.error);
	}
	else if (msg.content.startsWith(prefix + "get calls")) {
		for (var i=0; i<warBases.length; i++){
			var j = i + 1;
			if(warBases[i].called){
				msg.channel.sendMessage(`#${j} is called by ${warBases[i].calledBy}`)
				.then(message=>console.log(`Sent message: ${message.content}`))
				.catch(console.error);
			}
		}
	}
	else if (msg.content.startsWith(prefix + "get war status")){
		if (currentWar.isActive){
			msg.channel.sendMessage(`War is active against ${currentWar.enemyClan}`)
				.then(message=>console.log(`Sent message: ${message.content}`))
				.catch(console.error);
		}
		else {
			msg.channel.sendMessage(`No active war.`)
			.then(message=>console.log(`Sent message: ${message.content}`))
			.catch(console.error)
		}
	}
});

client.on('ready', () => {
  console.log('I am ready!');
});

client.login("");
