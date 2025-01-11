var cloakCounter = document.getElementById("cloakCounter");
var wandCounter = document.getElementById("wandCounter");
var stoneCounter = document.getElementById("stoneCounter");

// Create connection to the SignalR Hub
var connectionDeathlyHallows = new signalR.HubConnectionBuilder()
    //.configureLogging(signalR.LogLevel.Information) // Configure the logging information
    .withUrl("/hubs/deathlyHallows").build(); // Configure the connection type

// Connect to methods that the Hub invokes (Receive notifications from the Hub)
connectionDeathlyHallows.on("updateDeathlyHallowsCount", (cloak, stone, wand) => {
    cloakCounter.innerText = cloak.toString();
    wandCounter.innerText = wand.toString();
    stoneCounter.innerText = stone.toString();
})

// On connection success
function fulfilled() {
    // Load the counters at the beginning through the connection fulfilled by calling the GetRaceStatus of the hub
    //connectionDeathlyHallows.invoke("GetRaceStatus").then((raceCounter) => {
    //    cloakCounter.innerText = raceCounter.cloak.toString();
    //    wandCounter.innerText = raceCounter.wand.toString();
    //    stoneCounter.innerText = raceCounter.stone.toString();
    //}).

    console.log("Connection to Deathly Hallows Hub succeeded!");
}

// On connection failure
function rejected() {
    console.log("Connection to Deathly Hallows Hub failed!");
}

// Start connection
connectionDeathlyHallows.start().then(fulfilled, rejected);