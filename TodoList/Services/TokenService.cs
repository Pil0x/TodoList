using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using TodoListAPI.Interfaces;

namespace TodoListAPI.Services
{
    public class TokenService : ITokenService
    {
        private readonly IConfiguration _config;
        public TokenService(IConfiguration config)
        {
            _config = config;
        }

        public async Task<string> CreateJwtToken(string id)
        {
            var symmetricSecurityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["IdentityServer:Key:Secret"]));
            var signingCredentials = new SigningCredentials(symmetricSecurityKey, SecurityAlgorithms.HmacSha256);
            var tokenExpirationMins = _config.GetValue<int>("IdentityServer:Key:TokenExpirationInMinutes");


            var token = new JwtSecurityToken(
                issuer: _config["IdentityServer:Key:Issuer"],
                audience: _config["IdentityServer:Key:Audience"],
                claims: GetTokenClaims(id),
                notBefore: DateTime.Now,
                expires: DateTime.Now.Add(TimeSpan.FromMinutes(tokenExpirationMins)),
                signingCredentials: signingCredentials);

            var result = new JwtSecurityTokenHandler().WriteToken(token);


            return result;
        }

        private IEnumerable<Claim> GetTokenClaims(string userId)
        {
            return new List<Claim>
                {
                  new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                  new Claim(JwtRegisteredClaimNames.Sub, userId),
                  new Claim(JwtRegisteredClaimNames.Iat, new DateTimeOffset(DateTime.Now).ToUnixTimeSeconds().ToString())
                };
        }
    }
}
