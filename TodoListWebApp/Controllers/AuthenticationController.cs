using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System.Diagnostics;
using TaskInnovice.Presentation.WebApp.Models;
using TaskInnovice.Presentation.WebApp.Settings;

namespace TaskInnovice.Presentation.WebApp.Controllers
{
    [Route("api/authenticate")]
    [ApiController]
    public class AuthenticationController : ControllerBase
    {
        private static readonly string _authenticationCookieKey = "authentication";

        [HttpPost("set")]
        public async Task<ActionResult> SetAuthenticationCookie(AuthenticationModel authenticationModel)
        {
            try
            {
                string convertedAuthentication = JsonConvert.SerializeObject(authenticationModel);
                Response.Cookies.Append(_authenticationCookieKey, convertedAuthentication, CookieSettings.GetDefaultSettings);
            }
            catch (Exception e)
            {
                return BadRequest($"Problem with adding {_authenticationCookieKey} cookie");
            }

            return Ok($"Added {_authenticationCookieKey} cookie");
        }

        [HttpGet("get")]
        public async Task<ActionResult> GetAuthenticationCookie()
        {
            var authenticationCookie = Request.Cookies[_authenticationCookieKey];

            if (authenticationCookie != null)
            {
                var authenticationModel = JsonConvert.DeserializeObject<AuthenticationModel>(authenticationCookie);
                return Ok(authenticationModel);
            }

            return BadRequest($"Problem with {_authenticationCookieKey} cookie");
        }


        [HttpDelete("delete")]
        public async Task<ActionResult> DeleteAuthenticationCookie()
        {
            try
            {
                Response.Cookies.Delete(_authenticationCookieKey);
            }
            catch (Exception e)
            {
                return BadRequest($"Problem with deleting {_authenticationCookieKey} cookie");
            }

            return Ok($"Deleted {_authenticationCookieKey} cookie");
        }
    }

}