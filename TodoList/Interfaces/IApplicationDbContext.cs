using Microsoft.EntityFrameworkCore;
using TodoListAPI.Models;

namespace TodoListAPI.Interfaces
{
    public interface IApplicationDbContext
    {
        DbSet<User> Users { get; }
        DbSet<Tasks> Tasks { get; }

        Task<int> SaveChangesAsync(CancellationToken cancellationToken);
    }
}
