using TodoListAPI.DTOs.UserDto;

namespace TodoListAPI.Models.Additional
{
    public class LoginResponse
    {
        public UserDto User { get; set; }
        public string Token { get; set; }
    }
}
