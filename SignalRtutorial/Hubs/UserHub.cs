using Microsoft.AspNetCore.SignalR;

namespace SignalRtutorial.Hubs
{
    public class UserHub : Hub
    {
        public static int TotalViews { get; set; } = 0;

        public async Task NewWindowLoaded()
        {
            TotalViews++;

            // Notify clients that the count was updated
            await Clients.All.SendAsync("updateTotalViews", TotalViews); // Target a method and pass the updated count
        }
    }
}
