using System;
using System.Threading.Tasks;
using AutoMapper;
using DTG.API.Data;
using DTG.API.Dtos;
using DTG.API.Models;
using Microsoft.AspNetCore.Mvc;

namespace DTG.API.Controllers
{
    [Route("api/[controller]")]
    public class VehiclesController : Controller
    {
        private readonly IMapper _mapper;
        private readonly DataContext _context;

        public VehiclesController(IMapper mapper, DataContext context)
        {
            _context = context;
            _mapper = mapper;

        }
        [HttpPost]
        public async Task<IActionResult> CreateVehicleProject([FromBody] VehicleDto vehicleDto)
        {

            if(ModelState.IsValid)
                return BadRequest(ModelState);

            var vehicle = _mapper.Map<VehicleDto, Vehicle>(vehicleDto);
            vehicle.LastUpdate = DateTime.Now;

            _context.Vehicles.Add(vehicle);
            await _context.SaveChangesAsync();

            var result =  _mapper.Map<Vehicle, VehicleDto>(vehicle);
            return Ok(result);

        }
    }
}