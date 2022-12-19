using TodoListAPI.DTOs.TaskDto;

namespace TodoListAPI.Interfaces
{
    public interface ITaskServices
    {
        Task<List<TaskDto>> GetTasks(int year, int month);
        Task<TaskDto> UpdateTask(TaskDto taskDto, CancellationToken cancellationToken);
        Task<bool> DeleteTask(int id, CancellationToken cancellationToken);
        Task<TaskDto> AddTask(TaskDto taskDto, CancellationToken cancellationToken);
    }
}
