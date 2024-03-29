using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using DTG.API.Data;
using DTG.API.Dtos;
using DTG.API.Helpers;
using DTG.API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;

namespace DTG.API.Controllers
{
    [Authorize]
    [Route("api/users/{userId}/photos")]

    public class PhotosController : Controller
    {

        private readonly IDatingRepository _repo;
        private readonly IMapper _mapper;
        private readonly IOptions<CloudinarySettings> _cloudinaryconfig;
        private Cloudinary _cloudinary;

        public PhotosController(IDatingRepository repo, IMapper mapper, IOptions<CloudinarySettings> cloudinaryconfig)
        {
            _repo = repo;
            _mapper = mapper;
            _cloudinaryconfig = cloudinaryconfig;
            Account cloudinaryAccount = new Account(
                _cloudinaryconfig.Value.CloudName,
                _cloudinaryconfig.Value.ApiKey,
                _cloudinaryconfig.Value.ApiSecret
            );
            _cloudinary = new Cloudinary(cloudinaryAccount);
        }


        [HttpGet("{id}", Name = "GetPhoto")]
        public async Task<IActionResult> GetPhoto(int id)
        {

            var photoFromRepo = await _repo.GetPhoto(id);

            var photo = _mapper.Map<PhotoForReturnDto>(photoFromRepo);

            return Ok(photo);
        }



        [HttpPost]
        public async Task<IActionResult> AddPhotoForUser(int userId, PhotoForCreationDto photoDto)
        {
            var user = await _repo.GetUser(userId);

            if (user == null)
                return BadRequest("Could not find user");


            var currentUserId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);


            if (currentUserId != user.Id)
                return Unauthorized();

            var file = photoDto.File;
            var uploadResult = new ImageUploadResult();

            if (file.Length > 0)
            {

                using (var stream = file.OpenReadStream())
                {

                    var uploadParams = new ImageUploadParams()
                    {

                        File = new FileDescription(file.Name, stream),
                        Transformation = new Transformation().Width(500).Height(500).Crop("fill").Gravity("face")
                    };

                    uploadResult = _cloudinary.Upload(uploadParams);
                }
            }

            photoDto.Url = uploadResult.Uri.ToString();
            photoDto.PublicId = uploadResult.PublicId;

            var photo = _mapper.Map<Photo>(photoDto);

            photo.User = user;

            if (!user.Photos.Any(m => m.IsMain))
                photo.IsMain = true;

            user.Photos.Add(photo);



            if (await _repo.SaveAll())
            {
                var photoToReturn = _mapper.Map<PhotoForReturnDto>(photo);
                return CreatedAtRoute("GetPhoto", new { id = photo.Id }, photoToReturn);
            }

            return BadRequest("Could not add the photo");
        }

        [HttpPost("{id}/setMain")]
        public async Task<IActionResult> SetMainPhoto(int userId, int id)
        {

            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();


            var photoFromRepo = await _repo.GetPhoto(id);

            if (photoFromRepo == null)
                return NotFound();

            if (photoFromRepo.IsMain)
                return BadRequest("Already Main Photo");


            var currentMainPhoto = await _repo.GetMainPhotoForUser(userId);

            if (currentMainPhoto != null)
                currentMainPhoto.IsMain = false;

            photoFromRepo.IsMain = true;

            if (await _repo.SaveAll())
                return NoContent();


            return BadRequest("Could not set photo to main");


        }


        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePhoto(int userId, int id)
        {

            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();


            var photoFromRepo = await _repo.GetPhoto(id);

            if (photoFromRepo == null)
                return NotFound();

            if (photoFromRepo.IsMain)
                return BadRequest("Cannot Delete Main Photo");

            if (photoFromRepo.PublicId != null)
            {
                var deleteParams = new DeletionParams(photoFromRepo.PublicId);
                var result = _cloudinary.Destroy(deleteParams);

                if (result.Result == "ok")
                    _repo.Delete(photoFromRepo);
            }

            if (photoFromRepo.PublicId == null)
            {
                _repo.Delete(photoFromRepo);
            }

            if (await _repo.SaveAll())
                return Ok();


            return BadRequest("Delete failed");
        }


    }

}