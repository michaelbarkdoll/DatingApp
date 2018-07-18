namespace SIS.API.Helpers
{
    public class UserParams
    {
        private const int MaxPageSize = 50;
        public int PageNumber { get; set; } = 1;
        private int pageSize = 50;
        public int PageSize { 
            get {
                return pageSize;
            } 
            set {
                pageSize = (value > MaxPageSize) ? MaxPageSize : value;
            } 
        }
        public int UserId { get; set; }
        public string Gender { get; set; }
        public int minAge { get; set; } = 15;
        public int maxAge { get; set; } = 99;
        public string OrderBy { get; set; }
        public string Advisor { get; set; }
    }
}