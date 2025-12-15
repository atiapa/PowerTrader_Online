using Microsoft.EntityFrameworkCore;
using PowerTraderPOS.API.Data;
using PowerTraderPOS.API.DTOs;
using PowerTraderPOS.API.Models.Existing;
using PowerTraderPOS.API.Services.Interfaces;

namespace PowerTraderPOS.API.Services
{
    public class AttendanceService : IAttendanceService
    {
        private readonly AppDbContext _context;

        public AttendanceService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<AttendanceDto>> GetAllAttendanceAsync()
        {
            return await _context.AttendanceTbl
                .Select(a => new AttendanceDto
                {
                    Refno = a.Refno,
                    StaffId = a.StaffId,
                    Name = a.Name,
                    Barcode = a.Barcode,
                    Position = a.Position,
                    Date = a.Date,
                    Login_Time = a.Login_Time,
                    Logout_Time = a.Logout_Time,
                    Logged = a.Logged,
                    Logout_Date = a.Logout_Date,
                    MinToLate = a.MinToLate,
                    Month = a.Month,
                    Year = a.Year,
                    Post = a.Post,
                    Branchcode = a.Branchcode,
                    OrganisationName = a.OrganisationName,
                    OrganisationCode = a.OrganisationCode,
                    BranchName = a.BranchName
                })
                .ToListAsync();
        }

        public async Task<AttendanceDto?> GetAttendanceByIdAsync(int id)
        {
            var attendance = await _context.AttendanceTbl.FindAsync(id);
            if (attendance == null) return null;

            return new AttendanceDto
            {
                Refno = attendance.Refno,
                StaffId = attendance.StaffId,
                Name = attendance.Name,
                Barcode = attendance.Barcode,
                Position = attendance.Position,
                Date = attendance.Date,
                Login_Time = attendance.Login_Time,
                Logout_Time = attendance.Logout_Time,
                Logged = attendance.Logged,
                Logout_Date = attendance.Logout_Date,
                MinToLate = attendance.MinToLate,
                Month = attendance.Month,
                Year = attendance.Year,
                Post = attendance.Post,
                Branchcode = attendance.Branchcode,
                OrganisationName = attendance.OrganisationName,
                OrganisationCode = attendance.OrganisationCode,
                BranchName = attendance.BranchName
            };
        }

        public async Task<AttendanceDto> CreateAttendanceAsync(CreateAttendanceDto dto)
        {
            var attendance = new AttendanceTbl
            {
                StaffId = dto.StaffId,
                Name = dto.Name,
                Position = dto.Position,
                Date = dto.Date ?? DateTime.Now.Date,
                Login_Time = dto.Login_Time ?? DateTime.Now.TimeOfDay,
                Logout_Time = dto.Logout_Time,
                Logged = dto.Logged ?? "Yes",
                Branchcode = dto.Branchcode,
                Month = DateTime.Now.ToString("MMMM"),
                Year = DateTime.Now.Year.ToString()
            };

            _context.AttendanceTbl.Add(attendance);
            await _context.SaveChangesAsync();

            return await GetAttendanceByIdAsync(attendance.Refno) ?? throw new InvalidOperationException();
        }

        public async Task<AttendanceDto?> UpdateAttendanceAsync(int id, UpdateAttendanceDto dto)
        {
            var attendance = await _context.AttendanceTbl.FindAsync(id);
            if (attendance == null) return null;

            if (dto.Logout_Time.HasValue) attendance.Logout_Time = dto.Logout_Time;
            if (dto.Logout_Date != null) attendance.Logout_Date = dto.Logout_Date;
            if (dto.MinToLate != null) attendance.MinToLate = dto.MinToLate;
            if (dto.Logged != null) attendance.Logged = dto.Logged;

            await _context.SaveChangesAsync();
            return await GetAttendanceByIdAsync(id);
        }

        public async Task<bool> DeleteAttendanceAsync(int id)
        {
            var attendance = await _context.AttendanceTbl.FindAsync(id);
            if (attendance == null) return false;

            _context.AttendanceTbl.Remove(attendance);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<IEnumerable<AttendanceDto>> SearchAttendanceAsync(string searchTerm)
        {
            return await _context.AttendanceTbl
                .Where(a => (a.StaffId != null && a.StaffId.Contains(searchTerm)) ||
                           (a.Name != null && a.Name.Contains(searchTerm)) ||
                           (a.Position != null && a.Position.Contains(searchTerm)))
                .Select(a => new AttendanceDto
                {
                    Refno = a.Refno,
                    StaffId = a.StaffId,
                    Name = a.Name,
                    Position = a.Position,
                    Date = a.Date,
                    Login_Time = a.Login_Time,
                    Logout_Time = a.Logout_Time,
                    Logged = a.Logged
                })
                .ToListAsync();
        }

        public async Task<IEnumerable<AttendanceDto>> GetAttendanceByStaffAsync(string staffId)
        {
            return await _context.AttendanceTbl
                .Where(a => a.StaffId == staffId)
                .Select(a => new AttendanceDto
                {
                    Refno = a.Refno,
                    StaffId = a.StaffId,
                    Name = a.Name,
                    Date = a.Date,
                    Login_Time = a.Login_Time,
                    Logout_Time = a.Logout_Time,
                    MinToLate = a.MinToLate
                })
                .ToListAsync();
        }

        public async Task<IEnumerable<AttendanceDto>> GetAttendanceByDateRangeAsync(DateTime startDate, DateTime endDate)
        {
            return await _context.AttendanceTbl
                .Where(a => a.Date >= startDate && a.Date <= endDate)
                .Select(a => new AttendanceDto
                {
                    Refno = a.Refno,
                    StaffId = a.StaffId,
                    Name = a.Name,
                    Position = a.Position,
                    Date = a.Date,
                    Login_Time = a.Login_Time,
                    Logout_Time = a.Logout_Time
                })
                .ToListAsync();
        }
    }
}
