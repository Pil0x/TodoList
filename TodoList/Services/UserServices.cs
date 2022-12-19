using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;
using TodoListAPI.DTOs.UserDto;
using TodoListAPI.Interfaces;

namespace TodoListAPI.Services
{
    public class UserServices : IUserServices
    {
        private readonly ICurrentUserService _currentUser;
        private readonly IApplicationDbContext _context;
        private readonly IMapper _mapper;

        public UserServices(ICurrentUserService currentUser, IApplicationDbContext context, IMapper mapper)
        {
            _currentUser = currentUser;
            _context = context;
            _mapper = mapper;
        }

        public async Task<UserDto?> GetUser()
        {
            var userId = _currentUser.UserId;

            var user = await _context.Users.ProjectTo<UserDto>(_mapper.ConfigurationProvider).FirstOrDefaultAsync(x => x.Id == userId);

            return user;
        }
    }
}
