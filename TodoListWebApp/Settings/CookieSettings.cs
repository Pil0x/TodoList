namespace TaskInnovice.Presentation.WebApp.Settings
{
    public class CookieSettings
    {
        public static CookieOptions GetDefaultSettings => new CookieOptions
        {
            HttpOnly = true,
            Expires = DateTime.UtcNow.AddMinutes(60),
            IsEssential = true,
            SameSite = SameSiteMode.None,
            Secure = true,
        };
    }
}
