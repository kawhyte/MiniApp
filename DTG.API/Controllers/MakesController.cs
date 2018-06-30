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

    public class MakesController : Controller
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;

        public MakesController(DataContext context, IMapper mapper)
        {
            _mapper = mapper;
            _context = context;

        }

        [HttpGet("/api/makes")]
        public async Task<IEnumerable<MakeDto>> GetMakes()
        {

            var makes = await _context.Makes.Include(m => m.Models).ToListAsync();
            return Mapper.Map<List<Make>, List<MakeDto>>(makes);
        }

    }
}