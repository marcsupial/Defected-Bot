var Discord = require("discord.js");
var client = new Discord.Client();
var channel = new Discord.Channel();
var warBases=[];

// Create a War Object

function warStatus(){
	this.clanName = "";
	this.size;
	this.active = false;
}

warStatus.prototype.isActive = function () {
	return this.active;
};

let currentWar = new warStatus;

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
		warBases.push({ rank: i });
	}
	currentWar.clanName = enemyName;
	currentWar.size = warSize;
	currentWar.active = true;
};

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
	// Start war command
	else if(msg.content.startsWith(prefix + "start war")) {
		let args = msg.content.split(" ");
		let numberOfBases = args[2];
		let enemyName = args[3];
		if (args.length > 3){
			for (var i=4; i < args.length; i++)
				enemyName = enemyName + " " + args[i];
		}
		// Check if there is already an active war
		if (currentWar.active){
			msg.channel.sendMessage(`We are already at war with ${currentWar.clanName}!`)
				.then(message=>console.log(`Sent message: ${message.content}`))
				.catch(console.error);
			return;
		}

		startWar(numberOfBases, enemyName);
		msg.channel.sendMessage(`War started against ${enemyName}.`)
			.then(message => console.log(`Sent message: ${message.content}`))
			.catch(console.error);
	}
	//End war command
	else if (msg.content.startsWith(prefix + "end war")) {
			if (!currentWar.active){
				msg.channel.sendMessage("We are not at war.")
					.then(message => console.log(`Sent message: ${message.content}`))
					.catch(console.error);
			}
			else {
				warBases = [];
				currentWar.active = false;
				msg.channel.sendMessage("War ended!")
					.then(message => console.log(`Sent message: ${message.content}`))
					.catch(console.error);
			}
	}

	// Call base command
	else if(msg.content.startsWith(prefix + "call")){
		let args = msg.content.split(" ");
		let baseCalled = args[1];
		// Correct for off by 1
		baseCalled--;
		if(baseCalled < 0 || baseCalled >= warBases.length){
			msg.channel.sendMessage(`#${args[1]} is not a valid number. Try again.`)
			.then(message=>console.log(`Sent message: ${message.content}`))
			.catch(console.error);
			return;
		}
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
		if(deleteBase < 0 || deleteBase >= warBases.length){
			msg.channel.sendMessage(`#${args[2]} is not a valid number. Try again.`)
			.then(message=>console.log(`Sent message: ${message.content}`))
			.catch(console.error);
			return;
		}
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
			msg.channel.sendMessage(`War is active against ${currentWar.clanName}`)
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

client.login("Mjc0NjY2NjI3OTU2NjA0OTQ4.C21jDA.00sQ8aw9c8la4qB0AiPvRb-v0xQ");
