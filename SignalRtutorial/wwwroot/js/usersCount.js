// Create connection to the SignalR Hub
var connectionUserCount = new signalR.HubConnectionBuilder().withUrl("/hubs/userCount").build();

// Connect to methods that the Hub invokes (Receive notifications from the Hub)
connectionUserCount.on("updateTotalViews", (value) => {
    var newCountSpan = document.getElementById("totalViewsCounter");
    newCountSpan.innerText = value.toString();
})

connectionUserCount.on("updateTotalUsers", (value) => {
    var newCountSpan = document.getElementById("totalUsersCounter");
    newCountSpan.innerText = value.toString();
})

// Invoke Hub methods (Send notifications to the Hub)
function newWindowLoadedOnClient() {
    connectionUserCount.send("NewWindowLoaded");
}

// On connection success
function fulfilled() {
    console.log("Connection to User Hub succeeded!");
    newWindowLoadedOnClient();
}

// On connection failure
function rejected() {
    console.log("Connection to User Hub failed!");
}

// Start connection
connectionUserCount.start().then(fulfilled, rejected);