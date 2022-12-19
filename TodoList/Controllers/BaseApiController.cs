using MediatR;
using Microsoft.AspNetCore.Hosting.Server;
using Microsoft.AspNetCore.Mvc;
using TodoListAPI.Interfaces;

namespace TodoListAPI.Controllers
{
    /// <summary>
    /// Base api controller
    /// </summary>
    [Route("api/[controller]")]
    [ApiController]
    public abstract class BaseApiController : ControllerBase
    {
        private ISender _mediator;
        private ICurrentUserService _currentUser;

        /// <summary>
        /// Mediator sender
        /// </summary>
        protected ISender Mediator => _mediator ??= HttpContext.RequestServices.GetService<ISender>();
        protected ICurrentUserService CurrentUser => _currentUser ??= HttpContext.RequestServices.GetService<ICurrentUserService>();
    }
}
