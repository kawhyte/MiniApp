using System.Collections.Generic;
using System.Threading.Tasks;
using DTG.API.Models;
using Microsoft.EntityFrameworkCore;

namespace DTG.API.Data
{
    public class VehicleRepository : IVehicleRepository
    {
        private readonly DataContext _context;

        public VehicleRepository(DataContext context)
        {
           _context = context;

        }
        public async Task<Vehicle> GetVehicle(int id, bool includeRelatedItems = true)
        {
            if (!includeRelatedItems)
            {
               return await _context.Vehicles.FindAsync(id);
            }

            return await _context.Vehicles
                .Include(v => v.Features)
                    .ThenInclude(vf => vf.Feature)
                .Include(v => v.Model)
                    .ThenInclude(m => m.Make)
                .SingleOrDefaultAsync(v => v.Id == id);
        }


        public void Add(Vehicle vehicle){

            _context.Vehicles.Add(vehicle);
        }

        public void Remove(Vehicle vehicle)
        {
            _context.Remove(vehicle);
        }

public async Task<IEnumerable<Vehicle>> GetVehicles()
    {
      return await _context.Vehicles
       .Include(v => v.Model)
          .ThenInclude(m => m.Make)
        .Include(v => v.Features)
          .ThenInclude(vf => vf.Feature)
        .ToListAsync();
    }


    }
}