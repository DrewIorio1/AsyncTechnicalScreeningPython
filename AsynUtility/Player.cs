using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace AsynUtility
{
    public class Player
    {
        public int? Rank { get; set; }

        [JsonPropertyName("Player")]
        public string PlayerName { get; set; }
        public int? AgeThatYear { get; set; }
        public int Hits { get; set; }
        public int Year { get; set; }
        public string Bats { get; set; }
        public int Id { get; set; }
    }
}
