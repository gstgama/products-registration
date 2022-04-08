using System.Threading.Tasks;

namespace API.Persistence.Contracts
{
  public class GeneralPersist : IGeneralPersist
  {
    private readonly ProductContext _context;

    public GeneralPersist(ProductContext context)
    {
      _context = context;
    }
    public void Add<T>(T entity) where T : class
    {
      _context.Add(entity);
    }

    public void Delete<T>(T entity) where T : class
    {
      _context.Remove(entity);
    }

    public void DeleteRange<T>(T entity) where T : class
    {
      _context.RemoveRange(entity);
    }
    public void Update<T>(T entity) where T : class
    {
      _context.Update(entity);
    }

    public async Task<bool> SaveChangesAsync()
    {
      return (await _context.SaveChangesAsync()) > 0;
    }

  }
}