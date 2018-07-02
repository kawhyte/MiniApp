using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using DTG.API.Data;
using DTG.API.Dtos;
using DTG.API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace DTG.API.Controllers
{
    [Route("api/[controller]")]
    public class VehiclesController : Controller
    {
        private readonly IMapper _mapper;
        private readonly IVehicleRepository _repository;
        private readonly IUnitOfWork _unitOfWork;

        public VehiclesController(IMapper mapper, IVehicleRepository repository, IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
            _repository = repository;
            _mapper = mapper;
        }
        [HttpPost]
        public async Task<IActionResult> CreateVehicleProject([FromBody] SaveVehicleDto vehicleDto)
        {

            if (ModelState.IsValid)
                return BadRequest(ModelState);

            var vehicle = _mapper.Map<SaveVehicleDto, Vehicle>(vehicleDto);
            vehicle.LastUpdate = DateTime.Now;

            _repository.Add(vehicle);
            await _unitOfWork.CompleteAsync();


            vehicle = await _repository.GetVehicle(vehicle.Id);
            // Added to repository
            /* vehicle = await _context.Vehicles
            .Include(v => v.Features)
                .ThenInclude(vf => vf.Feature)
            .Include(v => v.Model)
                .ThenInclude(m => m.Make)
            .SingleOrDefaultAsync(v => v.Id == vehicle.Id) */

            var result = _mapper.Map<Vehicle, VehicleDto>(vehicle);
            return Ok(result);

        }



        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateVehicleProject(int id, [FromBody] SaveVehicleDto vehicleDto)
        {
            if (ModelState.IsValid)
                return BadRequest(ModelState);

            var vehicle = await _repository.GetVehicle(id);

            if (vehicle == null)
                return NotFound();

            _mapper.Map<SaveVehicleDto, Vehicle>(vehicleDto, vehicle);
            vehicle.LastUpdate = DateTime.Now;

            await _unitOfWork.CompleteAsync();
            vehicle =  await _repository.GetVehicle(vehicle.Id);
            var result = _mapper.Map<Vehicle, VehicleDto>(vehicle);
            return Ok(result);
        }


        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteVehicleProject(int id)
        {
            var vehicle = await _repository.GetVehicle(id, includeRelatedItem: false);

            if (vehicle == null)
                return NotFound();

            _repository.Remove(vehicle);
            await _unitOfWork.CompleteAsync();

            return Ok(id);
        }


        [HttpGet("{id}")]
        public async Task<IActionResult> GetVehicleProject(int id)
        {
            var vehicle = await _repository.GetVehicle(id);

            if (vehicle == null)
                return NotFound();

            var vehicleProject = _mapper.Map<Vehicle, VehicleDto>(vehicle);

            return Ok(vehicleProject);
        }



[HttpGet]
    public async Task<IEnumerable<VehicleDto>> GetVehicles(VehicleFilterQueryDto vehicleFilterDto)
    {
     var filter = _mapper.Map<VehicleFilterQueryDto, VehicleFilterQuery>(vehicleFilterDto);
      var vehicles = await _repository.GetVehicles(filter);
 
     return _mapper.Map<IEnumerable<Vehicle>, IEnumerable<VehicleDto>>(vehicles);
    }

     
    }
}