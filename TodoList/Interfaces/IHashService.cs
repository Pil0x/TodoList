namespace TodoListAPI.Interfaces
{
    public interface IHashService
    {
        Task<string> HashPassword(string password);
    }
}
