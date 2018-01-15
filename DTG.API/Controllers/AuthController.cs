using System.Threading.Tasks;
using DTG.API.Data;
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
        public async Task<IActionResult> Register(string username, string password)
        {
            //validate request here

            username = username.ToLower();
            
            if (await _repo.UserExists(username))
                return BadRequest("Username is already taken");

            var userToCreate = new User {Username = username};

            var createUser = await _repo.Register(userToCreate, password);

            return StatusCode(201);


        }



    }
}