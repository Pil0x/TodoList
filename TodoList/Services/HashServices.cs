using System.Security.Cryptography;
using System.Text;
using TodoListAPI.Interfaces;
using static System.Net.Mime.MediaTypeNames;

namespace TodoListAPI.Services
{
    public class HashServices : IHashService
    {
        public HashServices()
        {

        }
        public async Task<string> HashPassword(string password)
        {
            using (SHA256 sha256Hash = SHA256.Create())
            {
                byte[] bytes = sha256Hash.ComputeHash(Encoding.UTF8.GetBytes(password));

                StringBuilder builder = new StringBuilder();
                for (int i = 0; i < bytes.Length; i++)
                {
                    builder.Append(bytes[i].ToString("x2"));
                }
                return builder.ToString();
            }
        }
    }
}
