using Microsoft.EntityFrameworkCore;
using MySql.Data.MySqlClient;
using System.Collections.Generic;
using System.Data;
using System.Linq;

namespace fabricasw.camara.usuario.api
{
    public class UsuarioRepository : Repository<Usuario>
    {
        protected UsuarioContext _context;

        public UsuarioRepository(UsuarioContext context) : base(context)
        {
            _context = context;
        }

        public AuthVM Auth(LoginVM login)
        {
            var procedure = "sp_usuario";
            var parameters = new List<MySqlParameter>
            {
                new MySqlParameter { MySqlDbType = MySqlDbType.VarChar, ParameterName = "@login", Value = login.Login },
                new MySqlParameter { MySqlDbType = MySqlDbType.VarChar, ParameterName = "@senha", Value = login.Senha },               
                new MySqlParameter { MySqlDbType = MySqlDbType.VarChar, ParameterName = "@auth", Value = "", Direction = ParameterDirection.Output }
            };

            MySqlConnection connection = new MySqlConnection(DbConn.ConnectionString);
            connection.Open();

            MySqlCommand command = new MySqlCommand(procedure, connection);
            command.Parameters.AddRange(parameters.ToArray());
            command.CommandTimeout = 5;
            command.CommandType = CommandType.StoredProcedure;                            
            command.ExecuteNonQuery();
            
            int userId = int.Parse(command.Parameters["@auth"].Value.ToString());
            command.Dispose();
            //Modelo 1
            //UsuarioVM user = userId > 0 ? Find(userId) : null;
            //TokenVM token = user != null ? user.ViewToToken() : null;

            //Modelo 2
            UsuarioVM user = userId > 0 ? Find(userId) : null;            
            AuthVM auth = user.TokenToAuth();
            return auth;                        
        }

        public UsuarioVM Find(int id)
        {
            return _context.Usuarios.Where(c => c.Id.Equals(id)).FirstOrDefault();
        }
        public UsuarioVM FindUser(string user)
        {
            return _context.Usuarios.Where(c => c.Login.Equals(user)).FirstOrDefault();
        }

        public List<UsuarioVM> List()
        {
            return _context.Usuarios.AsQueryable().ToList();           
        }

        public bool Status(int id, string status)
        {
            UsuarioVM view = _context.Usuarios.Where(a => a.Id.Equals(id)).FirstOrDefault();
            Usuario model = view.ViewToModel();
            model.Ativo = status;
            Db.Entry(model).CurrentValues.SetValues(model);
            Db.Entry(model).State = EntityState.Modified;
            Save();
            return true;
        }

        public bool Reset(int id)
        {
            UsuarioVM view = _context.Usuarios.Where(a => a.Id.Equals(id)).FirstOrDefault();
            Usuario model = view.ViewToModel();
            model.Senha = "123456";
            Db.Entry(model).CurrentValues.SetValues(model);
            Db.Entry(model).State = EntityState.Modified;
            Save();
            return true;           
        }

    }
}
