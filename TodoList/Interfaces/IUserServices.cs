using TodoListAPI.DTOs.UserDto;

namespace TodoListAPI.Interfaces
{
    public interface IUserServices
    {
        Task<UserDto> GetUser();
    }
}
