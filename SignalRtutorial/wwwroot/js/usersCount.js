let user = "Mauro";

// Create connection to the SignalR Hub
var connectionUserCount = new signalR.HubConnectionBuilder()
    .configureLogging(signalR.LogLevel.Information) // Configure the logging information
    .withUrl("/hubs/userCount", signalR.HttpTransportType.WebSockets).build(); // Configure the connection type

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
    connectionUserCount.invoke("NewWindowLoaded", user).then((value) => console.log(value));
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