using Microsoft.EntityFrameworkCore;
using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;

namespace fabricasw.camara.registro.api
{
    public class RegistroRepository : Repository<Registro>
    {
        protected RegistroContext _context;

        public RegistroRepository(RegistroContext context) : base(context)
        {
            _context = context;
        }

        public ProtocoloVM Post(ObjetoVM obj)
        {            
            ProtocoloVM protocolo = new ProtocoloVM
            {
                Sequencia = string.Empty
            };

            var procedure = "sp_registro";
            var parameters = new List<MySqlParameter>
            {
                new MySqlParameter { MySqlDbType = MySqlDbType.VarChar, ParameterName = "@tipo", Value = obj.Tipo },
                new MySqlParameter { MySqlDbType = MySqlDbType.VarChar, ParameterName = "@assunto", Value = obj.Assunto },
                new MySqlParameter { MySqlDbType = MySqlDbType.VarChar, ParameterName = "@mensagem", Value = obj.Mensagem },
                new MySqlParameter { MySqlDbType = MySqlDbType.VarChar, ParameterName = "@nome", Value = obj.Nome },
                new MySqlParameter { MySqlDbType = MySqlDbType.VarChar, ParameterName = "@fone", Value = obj.Fone },
                new MySqlParameter { MySqlDbType = MySqlDbType.VarChar, ParameterName = "@email", Value = obj.Email },
                new MySqlParameter { MySqlDbType = MySqlDbType.DateTime, ParameterName = "@datahora", Value = DateTime.Now.AddDays(7) },
                new MySqlParameter { MySqlDbType = MySqlDbType.VarChar, ParameterName = "@observacao", Value = "WEB" },
                new MySqlParameter { MySqlDbType = MySqlDbType.Int32, ParameterName = "@usuario", Value = obj.Usuario },                
                new MySqlParameter { MySqlDbType = MySqlDbType.VarChar, ParameterName = "@protocolo", Value = string.Empty, Direction = ParameterDirection.Output }
            };

            MySqlConnection connection = new MySqlConnection(DbConn.ConnectionString);
            connection.Open();

            MySqlCommand command = new MySqlCommand(procedure, connection);
            command.Parameters.AddRange(parameters.ToArray());
            command.CommandTimeout = 5;
            command.CommandType = CommandType.StoredProcedure;                            
            command.ExecuteNonQuery();
            
            protocolo.Sequencia = command.Parameters["@protocolo"].Value.ToString();
            command.Dispose();
            return protocolo;
        }

        public RegistroVM Search(string uuId)
        {
            return _context.Registros.Where(c => c.Uu_Id.Equals(uuId)).FirstOrDefault();
        }

        public RegistroVM Find(int id)
        {
            return _context.Registros.Where(c => c.Id.Equals(id)).FirstOrDefault();
        }

        public List<RegistroVM> List()
        {
            return _context.Registros.AsQueryable().ToList();
        }

        public bool Status(int id, int code)
        {
            Agenda agenda = _context.Agendas.Where(a => a.Id_Registro.Equals(id)).FirstOrDefault();
            agenda.Status = RegistroFactory.ToStatus(code);
            Db.Entry(agenda).CurrentValues.SetValues(agenda);
            Db.Entry(agenda).State = EntityState.Modified;
            Save();
            return true;
        }

        public bool Log(RegistroLog obj)
        {
            Db.Entry(obj).CurrentValues.SetValues(obj);
            Db.Entry(obj).State = EntityState.Added;
            _context.RegistrosLog.Add(obj);
            Save();
            return true;
        }

        public DashboardVM Dashboard(int param)
        {
            var sql = RegistroFactory.ToQuery(param);

            MySqlConnection connection = new MySqlConnection(DbConn.ConnectionString);
            connection.Open();
            
            MySqlCommand command = new MySqlCommand(sql, connection);
            command.CommandTimeout = 120;
            command.CommandType = CommandType.Text;
            MySqlDataReader reader = command.ExecuteReader();

            DashboardVM dashboard = new DashboardVM();
            dashboard.Title = "Dashboard"+ param;
            dashboard.Data = new List<DataVM>();
            dashboard.Count = 0;

            if (reader.HasRows)
            {
                while (reader.Read())
                {
                    DataVM data = new DataVM();                    
                    data.Field = reader.GetString(0);
                    data.Count = reader.GetInt32(1);
                    dashboard.Data.Add(data);
                    dashboard.Count = dashboard.Count + data.Count;
                }
            }
            connection.Dispose();
            return dashboard;
        }        

    }
}
