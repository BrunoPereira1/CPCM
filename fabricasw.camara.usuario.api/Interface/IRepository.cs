using System;

namespace fabricasw.camara.usuario.api
{
    public interface IRepository<T> : IDisposable where T : class
    {
        void Insert(T obj);
        void Delete(int id);        
        void Update(T obj);
        void Save();        
    }
}
