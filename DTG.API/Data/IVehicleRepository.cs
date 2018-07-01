using System.Collections.Generic;
using System.Threading.Tasks;
using DTG.API.Models;

namespace DTG.API.Data
{
    public interface IVehicleRepository
    {
        Task<Vehicle> GetVehicle(int id , bool includeRelatedItem = true);
        void Add(Vehicle vehicle);
        void Remove(Vehicle vehicle);
        
    }
}