using Microsoft.AspNetCore.Mvc;
using TodoListAPI.DTOs.UserDto;
using TodoListAPI.Interfaces;
using TodoListAPI.Models.Additional;

namespace TodoListAPI.Controllers
{
    [ApiController]
    [Route("api/auth")]
    public class AuthController : BaseApiController
    {
        private readonly IAuthServices _authServices;
        public AuthController(IAuthServices authServices)
        {
            _authServices = authServices;
        }

        [HttpPost("login")]
        public async Task<ActionResult<UserDto?>> Login(LoginRequest request, CancellationToken cancellationToken)
        {
            return Ok(await _authServices.Login(request.Email, request.Password));
        }

        [HttpPost("register")]
        public async Task<ActionResult<UserDto?>> Register(RegisterUserDto request, CancellationToken cancellationToken)
        {
            return Ok(await _authServices.Register(request, cancellationToken));
        }
    }
}
