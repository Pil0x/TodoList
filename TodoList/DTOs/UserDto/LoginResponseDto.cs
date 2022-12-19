using AutoMapper;
using TodoListAPI.Mappings;
using TodoListAPI.Models;

namespace TodoListAPI.DTOs.UserDto
{
    public class UserDto : IMapFrom<User>
    {
        public int Id { get; set; }
        public string Email { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }

        public void Mapping(Profile profile)
        {
            profile.CreateMap<User, UserDto>();
        }
    }
}
