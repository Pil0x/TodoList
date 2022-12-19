using Microsoft.AspNetCore.Mvc;
using TodoListAPI.DTOs.TaskDto;
using TodoListAPI.Interfaces;

namespace TodoListAPI.Controllers
{
    [Route("api/tasks")]
    [ApiController]
    public class TaskController : BaseApiController
    {
        private readonly ITaskServices _taskServices;
        public TaskController(ITaskServices taskServices)
        {
            _taskServices = taskServices;
        }

        [HttpGet]
        public async Task<ActionResult<List<TaskDto>>> GetTasks(int year, int month, CancellationToken cancellationToken)
        {
            return Ok(await _taskServices.GetTasks(year, month));
        }

        [HttpPost]
        public async Task<ActionResult<TaskDto>> AddTask(TaskDto task, CancellationToken cancellationToken)
        {
            return Ok(await _taskServices.AddTask(task, cancellationToken));
        }

        [HttpPut]
        [Route("{taskId}/update")]
        public async Task<ActionResult<TaskDto>> UpdateTask(TaskDto task, CancellationToken cancellationToken)
        {
            return Ok(await _taskServices.UpdateTask(task, cancellationToken));
        }

        [HttpDelete]
        [Route("{taskId}/delete")]
        public async Task<ActionResult<bool>> DeleteTask(int taskId, CancellationToken cancellationToken)
        {
            return Ok(await _taskServices.DeleteTask(taskId, cancellationToken));
        }
    }
}
