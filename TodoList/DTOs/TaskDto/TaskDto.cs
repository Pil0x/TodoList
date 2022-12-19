using AutoMapper;
using TodoListAPI.Mappings;
using TodoListAPI.Models;

namespace TodoListAPI.DTOs.TaskDto
{
    public class TaskDto : IMapFrom<Tasks>
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public DateTime Date { get; set; }

        public void Mapping(Profile profile)
        {
            profile.CreateMap<Tasks, TaskDto>();
        }
    }
}
