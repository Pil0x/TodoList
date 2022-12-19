using TodoListAPI.DTOs.UserDto;
using TodoListAPI.Models.Additional;

namespace TodoListAPI.Interfaces
{
    public interface IAuthServices
    {
        Task<bool> Register(RegisterUserDto registerDto, CancellationToken cancellation);
        Task<LoginResponse> Login(string email, string password);
    }
}
