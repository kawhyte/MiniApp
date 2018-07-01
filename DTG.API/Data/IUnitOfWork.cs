using System.Threading.Tasks;

namespace DTG.API.Data
{
    public interface IUnitOfWork
    {
        Task CompleteAsync();
    }
}