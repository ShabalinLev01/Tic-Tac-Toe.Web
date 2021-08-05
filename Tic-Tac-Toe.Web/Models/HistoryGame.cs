using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Tic_Tac_Toe.Web.Models
{
    public class HistoryGame
    {  
        [Key]
        [Required]
        public Guid Id { get; set; }
        
        [Required]
        public Guid GameId { get; set; }
        
        [ForeignKey("GameId")]
        public Game Game { get; set; }
        
        [Required]
        public string WhoIsMove { get; set; }
        
        [Required]
        public int Stroke { get; set; }
        
        [Required]
        public int NumberOfStroke { get; set; }
    }
}