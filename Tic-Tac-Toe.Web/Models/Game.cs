using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Tic_Tac_Toe.Web.Models.Enums;

namespace Tic_Tac_Toe.Web.Models
{
    public class Game
    {
        [Key]
        [Required]
        public Guid Id { get; set; } = Guid.NewGuid();
        
        [Required]
        public string PlayerName { get; set; }
        
        [Required]
        public DateTime StartDate { get; set; } = DateTime.Now;

        public string WhoWin { get; set; }

        [Required] 
        public StateOfGame StateOfGame { get; set; } = StateOfGame.DontFinish;
    }
}