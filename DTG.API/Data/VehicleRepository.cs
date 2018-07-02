using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
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

public async Task<IEnumerable<Vehicle>> GetVehicles(VehicleFilterQuery filterQueryObj)
    {
      var query =  _context.Vehicles
       .Include(v => v.Model)
          .ThenInclude(m => m.Make)
        .Include(v => v.Features)
          .ThenInclude(vf => vf.Feature)
        .AsQueryable();

       if (filterQueryObj.MakeId.HasValue)
        query = query.Where(v => v.Model.MakeId == filterQueryObj.MakeId.Value);


    var columnsMap = new Dictionary<string, Expression<Func<Vehicle, object>>>()
      {
        ["make"] = v => v.Model.Make.Name,
        ["model"] = v => v.Model.Name,
        ["contactName"] = v => v.ContactName
        //["id"] = v => v.Id
      };


      if (String.IsNullOrWhiteSpace(filterQueryObj.SortBy) || !columnsMap.ContainsKey(filterQueryObj.SortBy))
            return query; 

      if (filterQueryObj.IsSortAscending)
        query = query.OrderBy(columnsMap[filterQueryObj.SortBy]);
      else
        query = query.OrderByDescending(columnsMap[filterQueryObj.SortBy]);

      /*       if (filterQueryObj.SortBy == "make")
        query = (filterQueryObj.IsSortAscending) ? query.OrderBy(v => v.Model.Make.Name) : query.OrderByDescending(v => v.Model.Make.Name);
      if (filterQueryObj.SortBy == "model")
       query = (filterQueryObj.IsSortAscending) ? query.OrderBy(v => v.Model.Name) : query.OrderByDescending(v => v.Model.Name);
      if (filterQueryObj.SortBy == "contactName")
        query = (filterQueryObj.IsSortAscending) ? query.OrderBy(v => v.ContactName) : query.OrderByDescending(v => v.ContactName);
      if (filterQueryObj.SortBy == "id")
        query = (filterQueryObj.IsSortAscending) ? query.OrderBy(v => v.Id) : query.OrderByDescending(v => v.Id); */


        return await query.ToListAsync();
    }


    }
}