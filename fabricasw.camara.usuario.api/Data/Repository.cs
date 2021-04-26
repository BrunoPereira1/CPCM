using Microsoft.EntityFrameworkCore;
using System;
using System.Data.Common;

namespace fabricasw.camara.usuario.api
{
    public class Repository<T> : IRepository<T> where T : class
    {
        protected UsuarioContext Db;
        protected DbSet<T> DbSet;
        protected DbConnection DbConn;

        public Repository(UsuarioContext context)
        {
            Db = context;
            DbSet = Db.Set<T>();
            DbConn = context.Database.GetDbConnection();
        }        

        public void Insert(T obj)
        {
            DbSet.Add(obj);
            Save();
        }

        public void Delete(int id)
        {
            T obj = DbSet.FindAsync(id).Result;
            DbSet.Remove(obj);
            Save();
        }

        public void Update(T obj)
        {
            DbSet.Update(obj);
            Save();
        }

        public void Save()
        {
            Db.SaveChanges();
        }     

        private bool disposed = false;

        protected virtual void Dispose(bool disposing)
        {
            if ((!this.disposed) && (disposing))           
                    Db.Dispose();
            
            this.disposed = true;
        }

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }        
    }
}
