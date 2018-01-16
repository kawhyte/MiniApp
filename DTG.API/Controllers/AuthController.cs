using System.Threading.Tasks;
using DTG.API.Data;
using DTG.API.Dtos;
using DTG.API.Models;
using Microsoft.AspNetCore.Mvc;

namespace DTG.API.Controllers
{
    [Route("api/[controller]")]
    public class AuthController : Controller
    {
        private readonly IAuthRepository _repo;
        public AuthController(IAuthRepository repo)
        {
            _repo = repo;

        }


        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] UserForRegisterDto userForRegisterDto)
        {
            //validate request here
            userForRegisterDto.Username = userForRegisterDto.Username.ToLower();
            
            if (await _repo.UserExists(userForRegisterDto.Username))
               ModelState.AddModelError("Username", "Username is already exists");

            if (!ModelState.IsValid)
              return BadRequest(ModelState);

           

            var userToCreate = new User {Username = userForRegisterDto.Username};

            var createUser = await _repo.Register(userToCreate, userForRegisterDto.Password);

            return StatusCode(201);


        }



    }
}