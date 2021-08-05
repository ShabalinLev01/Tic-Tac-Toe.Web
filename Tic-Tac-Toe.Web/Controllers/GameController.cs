using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Tic_Tac_Toe.Web.Controllers.RestModels;
using Tic_Tac_Toe.Web.Models;
using Tic_Tac_Toe.Web.Models.Enums;

namespace Tic_Tac_Toe.Web.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class GameController : ControllerBase
    {
        private readonly GameContext _context;
        private const string ComputerName = "Computer";
        
        public GameController(GameContext context)
        {
            _context = context;
        }

        /// <summary>
        /// Get action from game, check win, doing stroke of computer, save changes
        /// </summary>
        /// <param name="action"></param>
        /// <returns></returns>
        [HttpPost]
        public IActionResult Post(PlayActionModel action)
        {
            //Get History and add new step
            var existedHistory = _context.HistoryGames
                .Where(x => x.GameId == action.Game.Id)
                .ToList();
            var newHistoryStep = new HistoryGame()
            {
                GameId = action.Game.Id,
                Stroke = action.Square,
                WhoIsMove = action.Game.PlayerName,
                NumberOfStroke = existedHistory.Any() ? 
                    existedHistory.Max(x=>x.NumberOfStroke) : 1
            };
            existedHistory.Add(newHistoryStep);
            _context.HistoryGames.Add(newHistoryStep);
            
            //Check win for player
            var isWin = CheckWinner(existedHistory.Where(x => x.WhoIsMove != ComputerName).ToList());
            if (isWin)
            {
               var game = _context.Games.Find(action.Game.Id);
               game.WhoWin = game.PlayerName;
               game.StateOfGame = StateOfGame.Finished;
               _context.SaveChanges();
               return Ok(new PlayActionModel(){Game = game, Square = newHistoryStep.Stroke});
            }
            
            //If Player didn't win
            var rand = new Random();
            var freeSheets = new List<int> {1, 2, 3, 4, 5, 6, 7, 8, 9};
            freeSheets = freeSheets.Where(x => !existedHistory.Select(y => y.Stroke).Contains(x)).ToList();
            var numberInList = rand.Next(freeSheets.Count);
            var newHistoryComputer = new HistoryGame()
            {
                GameId = action.Game.Id,
                Stroke = freeSheets[numberInList],
                WhoIsMove = ComputerName,
                NumberOfStroke = existedHistory.Any() ? 
                    existedHistory.Max(x=>x.NumberOfStroke) : 1
            };
            existedHistory.Add(newHistoryComputer);
            _context.HistoryGames.Add(newHistoryComputer);
            
            //Check win for Computer
            isWin = CheckWinner(existedHistory.Where(x => x.WhoIsMove == ComputerName).ToList());
            if (!isWin)
            {
                _context.SaveChanges();
                action.Square = newHistoryComputer.Stroke;
                return Ok(action);
            }
            {
                var game = _context.Games.Find(action.Game.Id);
                game.WhoWin = ComputerName;
                game.StateOfGame = StateOfGame.Finished;
                _context.SaveChanges();
                return Ok(new PlayActionModel(){Game = game, Square = newHistoryComputer.Stroke});
            }
        }
        
        
        private static bool CheckWinner(IReadOnlyCollection<HistoryGame> existedHistory)
        {
            var lines = new[]
                {
                    new[] {1, 2, 3}, 
                    new[] {4, 5, 6},
                    new[] {7, 8, 9},
                    new[] {1, 4, 7},
                    new[] {2, 5, 8},
                    new[] {3, 6, 9},
                    new[] {1, 5, 9},
                    new[] {3, 5, 7},
                };
            if (existedHistory.Count < 3)
                return false;

            return lines.Any(line => { 
                var count = existedHistory.Select(h => h.Stroke).Intersect(line);
                return count.Count() == 3; });
        }
    }
}