using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Tic_Tac_Toe.Web.Models;

namespace Tic_Tac_Toe.Web.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class StartGameController : ControllerBase
    {
        private readonly GameContext _context;
        
        public StartGameController(GameContext context)
        {
            _context = context;
        }
        
        /// <summary>
        /// Start new game and add to DB
        /// </summary>
        /// <param name="game"></param>
        /// <returns></returns>
        [HttpPost]
        public IActionResult Post([FromBody] Game game)
        {
            _context.Games.Add(game);
            _context.SaveChanges();
            return Ok(game);
        }
    }
}