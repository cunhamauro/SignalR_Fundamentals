using Microsoft.AspNetCore.SignalR;

namespace SignalRtutorial.Hubs
{
    public class DeathlyHallowsHub : Hub
    {
        public Dictionary<string, int> GetRaceStatus()
        {
            return SD.DeathlyHallowRace;
        }

        // To load the counters at the beginning
        public override async Task OnConnectedAsync()
        {
            await Clients.All.SendAsync("updateDeathlyHallowsCount", SD.DeathlyHallowRace[SD.Cloak], SD.DeathlyHallowRace[SD.Stone], SD.DeathlyHallowRace[SD.Wand]);
            await base.OnConnectedAsync();
        }
    }
}
