using System.Threading.Tasks;

namespace DTG.API.Data
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly DataContext _context;
        public UnitOfWork(DataContext context)
        {
            _context = context;

        }
        public async Task CompleteAsync()
        {
            await _context.SaveChangesAsync();
        }
    }
}