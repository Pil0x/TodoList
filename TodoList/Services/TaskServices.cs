using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using TodoListAPI.DTOs.TaskDto;
using TodoListAPI.Interfaces;
using TodoListAPI.Models;

namespace TodoListAPI.Services
{
    public class TaskServices : ITaskServices
    {
        private readonly ICurrentUserService _currentUser;
        private readonly IApplicationDbContext _context;
        private readonly IMapper _mapper;

        public TaskServices(ICurrentUserService currentUser, IApplicationDbContext context, IMapper mapper)
        {
            _currentUser = currentUser;
            _context = context;
            _mapper = mapper;
        }

        public async Task<TaskDto> AddTask(TaskDto taskDto, CancellationToken cancellationToken)
        {
            if (taskDto != null)
            {
                var task = new Tasks
                {
                    Title = taskDto.Title,
                    Description = taskDto.Description,
                    Date = taskDto.Date,
                    UserId = (int)_currentUser.UserId
                };

                try
                {
                    await _context.Tasks.AddAsync(task);
                    await _context.SaveChangesAsync(cancellationToken);

                    var dto = _mapper.Map<TaskDto>(task);

                    return dto;
                }
                catch
                {
                    return null;
                }
            }

            return null;
        }

        public async Task<bool> DeleteTask(int id, CancellationToken cancellationToken)
        {
            var task = await _context.Tasks.FirstOrDefaultAsync(x => x.Id == id);

            if (task.UserId != _currentUser.UserId)
                return false;

            _context.Tasks.Remove(task);
            await _context.SaveChangesAsync(cancellationToken);

            return true;
        }

        public async Task<List<TaskDto>> GetTasks(int year, int month)
        {
            var tasks = await _context.Tasks
                .Where(x => x.Date.Year == year && x.Date.Month == month && x.UserId == _currentUser.UserId)
                .ProjectTo<TaskDto>(_mapper.ConfigurationProvider)
                .ToListAsync();

            return tasks;
        }

        public async Task<TaskDto> UpdateTask(TaskDto taskDto, CancellationToken cancellationToken)
        {
            if (taskDto != null)
            {
                var task = await _context.Tasks.FirstOrDefaultAsync(x => x.Id == taskDto.Id);

                task.Title = taskDto.Title;
                task.Description = taskDto.Description;
                task.Date = taskDto.Date;

                try
                {
                    _context.Tasks.Update(task);
                    await _context.SaveChangesAsync(cancellationToken);

                    var dto = _mapper.Map<TaskDto>(task);

                    return dto;
                }
                catch
                {
                    return null;
                }
            }

            return null;
        }
    }
}
