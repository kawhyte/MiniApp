using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using DTG.API.Controllers.Reources;
using DTG.API.Data;
using DTG.API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace DTG.API.Controllers
{
    public class FeaturesController: Controller
    {
    private readonly DataContext _context;
    private readonly IMapper _mapper;
    public FeaturesController(DataContext context, IMapper mapper)
    {
      _mapper = mapper;
      _context = context;
    }

    [HttpGet("/api/features")]
    public async Task<IEnumerable<FeatureResource>> GetFeatures()
    {
      var features = await _context.Features.ToListAsync();
      
      return _mapper.Map<List<Feature>, List<FeatureResource>>(features); 
    }
  }
}