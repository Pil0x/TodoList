using AutoMapper;
using Microsoft.EntityFrameworkCore;
using TodoListAPI.DTOs.UserDto;
using TodoListAPI.Interfaces;
using TodoListAPI.Models;
using TodoListAPI.Models.Additional;

namespace TodoListAPI.Services
{
    public class AuthServices : IAuthServices
    {
        private readonly ITokenService _tokenService;
        private readonly IApplicationDbContext _context;
        private readonly IMapper _mapper;
        private readonly IHashService _hashService;

        public AuthServices(ITokenService tokenService, IMapper mapper, IApplicationDbContext context, IHashService hashService)
        {
            _tokenService = tokenService;
            _mapper = mapper;
            _context = context;
            _hashService = hashService;
        }

        public async Task<LoginResponse> Login(string email, string password)
        {
            var user = await _context.Users.FirstOrDefaultAsync(x => x.Email == email);

            if (await _hashService.HashPassword(password) == user.Password)
            {
                var token = await _tokenService.CreateJwtToken(user.Id.ToString());

                LoginResponse loginResponse = new()
                {
                    User = _mapper.Map<UserDto>(user),
                    Token = token
                };

                return loginResponse;
            }
            return null;
        }

        public async Task<bool> Register(RegisterUserDto registerDto, CancellationToken cancellation)
        {
            var isRegistered = _context.Users.Any(x => x.Email == registerDto.Email);

            if(isRegistered || registerDto.Password != registerDto.ConfirmPassword) return false;

            var hashedPassword = await _hashService.HashPassword(registerDto.Password);

            var user = new User
            {
                Email = registerDto.Email,
                FirstName = registerDto.FirstName,
                LastName = registerDto.LastName,
                Password = hashedPassword,
            };

            try
            {
                await _context.Users.AddAsync(user);
                await _context.SaveChangesAsync(cancellation);

                return true;
            }
            catch
            {
                return false;
            }
        }
    }
}
