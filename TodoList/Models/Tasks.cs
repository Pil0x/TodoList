using System.ComponentModel.DataAnnotations;

namespace TodoListAPI.Models
{
    public class Tasks
    {
        [Key]
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public DateTime Date { get; set; }


        public int UserId { get; set; }
        public virtual User User { get; set; }
    }
}
