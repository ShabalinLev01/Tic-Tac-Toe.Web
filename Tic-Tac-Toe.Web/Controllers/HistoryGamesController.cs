using System;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Tic_Tac_Toe.Web.Models;

namespace Tic_Tac_Toe.Web.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class HistoryGamesController : ControllerBase
    {
        private readonly GameContext _context;
        
        public HistoryGamesController(GameContext context)
        {
            _context = context;
        }

        /// <summary>
        /// Get List of Games
        /// </summary>
        /// <returns></returns>
        [HttpGet("GetGames")]
        public IActionResult GetGames()
        {
            var listGames = _context.Games.OrderByDescending(x=>x.StartDate).ToList();
            return Ok(listGames);
        }

        /// <summary>
        /// Get History of strokes for game
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpGet("GetHistory")]
        public IActionResult GetHistory(Guid id)
        {
            var history = _context.HistoryGames
                .Where(x => x.GameId == id)
                .OrderBy(x=>x.NumberOfStroke)
                .ToList();
            return Ok(history);
        }
    }
}