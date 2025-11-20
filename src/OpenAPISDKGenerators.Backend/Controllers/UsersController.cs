using Microsoft.AspNetCore.Mvc;

namespace OpenAPISDKGenerators.Backend.Controllers;

[ApiController]
[Route("[controller]")]
public class UsersController : ControllerBase
{
    [HttpGet(Name = "GetUsers")]
    public ActionResult<List<User>> GetUsers()
    {
        List<User> users =
        [
            new Student()
            {
                Id = Guid.CreateVersion7(),
                Name = "John Doe",
                Email = "a@b.com",
                GPA = 3.5m,
                Major = "Computer Science"
            },
            new Teacher()
            {
                Id = Guid.CreateVersion7(),
                Name = "Jane Doe",
                Email = "c@d.com",
                Department = "Mathematics",
                YearsOfExperience = 10
            },
        ];

        return Ok(users);
    }
}
