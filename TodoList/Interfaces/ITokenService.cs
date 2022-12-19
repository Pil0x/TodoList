namespace TodoListAPI.Interfaces
{
    public interface ITokenService
    {
        Task<string> CreateJwtToken(string id);
    }
}
