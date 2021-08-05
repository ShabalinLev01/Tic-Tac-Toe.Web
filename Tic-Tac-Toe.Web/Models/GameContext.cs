using Microsoft.EntityFrameworkCore;

namespace Tic_Tac_Toe.Web.Models
{
    public sealed class GameContext: DbContext
	{

		public DbSet<Game> Games { get; set; }

		public DbSet<HistoryGame> HistoryGames { get; set; }


		public GameContext(DbContextOptions<GameContext> options)
			: base(options)
		{
			Database.EnsureCreated();
		}
	}
}