using System;

namespace fabricasw.camara.registro.api
{
    public interface IRepository<T> : IDisposable where T : class
    {
        void Insert(T obj);
        void Delete(int id);        
        void Update(T obj);
        void Save();        
    }
}
