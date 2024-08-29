/*
 * Class - Main control function of the Asynch Utility to grab data and assign to the database.
 * 
 */
using AsynUtility;
using System.Text.Json;


class Program
{
    static async Task Main(string[] args)
    {
        var players = await FetchPlayersFromApi();

        Console.Write($"Number of players {players?.Count}");
        //AddPlayersToDatabase(players);
        for (int i = 0; i < players.Count; i++)
        {
            if (players[i].Rank == 0)
                players[i].Rank = (i + 1);
        }

        AddPlayersToDatabase(players);

    }
    
    //
    // Helper function to add all the players from the API to the database
    //
    static void AddPlayersToDatabase(List<Player> players)
    {
        using var context = new BaseballContext();
        context.Players.AddRange(players);
        context.SaveChanges();
        Console.WriteLine("Players added to the database.");
    }

    //
    // Helper function to fetch all players from the sampleapi data api 
    //
    static async Task<List<Player>> FetchPlayersFromApi()
    {
        var url = "https://api.sampleapis.com/baseball/hitsSingleSeason";
        using var client = new HttpClient();
        var response = await client.GetStringAsync(url);
        var options = new JsonSerializerOptions
        {
            PropertyNameCaseInsensitive = true,
            Converters = { new NullableIntConverter() }
        };
        return JsonSerializer.Deserialize<List<Player>>(response, options);
    }

}

/// <summary>
/// Helps to with bug in .net core framework to add collect values string json 
/// </summary>
/// <remarks>
/// Code is that cause issue was found to be structured "" 
/// </remarks>
public class NullableIntConverter : System.Text.Json.Serialization.JsonConverter<int?>
{
    public override int? Read(ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options)
    {
        if (reader.TokenType == JsonTokenType.Null)
        {
            return null;
        }

        int value = 0;
        try
        {
            //.gets.TryGetInt32(out value);
            var val =  reader.GetString();
            if (val == null)    
                return null;
            int.TryParse(val, out value);
        }
        catch (Exception)
        {

        }

        return value;
    }

    public override void Write(Utf8JsonWriter writer, int? value, JsonSerializerOptions options)
    {
        if (value.HasValue)
        {
            writer.WriteNumberValue(value.Value);
        }
        else
        {
            writer.WriteNullValue();
        }
    }
}