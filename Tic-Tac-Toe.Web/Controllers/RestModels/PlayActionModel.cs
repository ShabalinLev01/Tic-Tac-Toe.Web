using Tic_Tac_Toe.Web.Models;
using Tic_Tac_Toe.Web.Models.Enums;

namespace Tic_Tac_Toe.Web.Controllers.RestModels
{
    public class PlayActionModel
    {
        public Game Game { get; set; }
        
        public int Square { get; set; }
    }
}