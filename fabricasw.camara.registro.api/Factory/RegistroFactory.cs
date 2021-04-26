using MySql.Data.MySqlClient;

namespace fabricasw.camara.registro.api
{
    public static class RegistroFactory
    {    
        public static Registro ObjToModel(this ObjetoVM obj)
        {
            if (obj == null)
                return null;

            var model = new Registro()
            {
                Id = obj.Id,
                Tipo = obj.Tipo,
                Assunto = obj.Assunto,
                Mensagem = obj.Mensagem,
                Nome = obj.Nome,
                Fone = obj.Fone,
                Email = obj.Email,
                Registrado_em = obj.Registrado_em,
                Uu_Id = obj.Uu_Id
            };

            return model;
        }

        public static RegistroLog ObjToModelLog(this ObjetoVM obj)
        {
            if (obj == null)
                return null;

            var model = new RegistroLog()
            {
                Id_registro = obj.Id,
                Id_usuario = obj.Usuario,                
            };

            return model;
        }

        public static RegistroVM ReaderToView(this MySqlDataReader reader)
        {
            RegistroVM view = null;
            if (reader == null)
                return view;
            else
            {
                view = new RegistroVM
                {
                    Id = reader.GetInt32(0),
                    Tipo = reader.GetString(1),
                    Assunto = reader.GetString(2),
                    Mensagem = reader.GetString(3),
                    Nome = reader.GetString(4),
                    Fone = reader.GetString(5),
                    Email = reader.GetString(6),
                    Registrado_em = reader.GetDateTime(7),
                    Status = reader.GetString(8),
                    Agenda_em = reader.GetDateTime(9),
                    Atualizado_em = reader.GetDateTime(10),
                    Modificado_em = reader.GetDateTime(11),
                    Observacao = reader.GetString(12),
                    Uu_Id = reader.GetString(13)
                };
            }

            return view;
        }

        public static string ToStatus(this int status)
        {
            string value;
            switch (status)
            {
                case 1:
                    value = "ABERTO";
                    break;
                case 2:
                    value = "VERIFICADO";
                    break;
                case 3:
                    value = "REALIZADO"; 
                    break;
                case 4: 
                    value = "PROCESSADO"; 
                    break;
                case 5:
                    value = "ENCERRADO";
                    break;
                case 6:
                    value = "CANCELADO";
                    break;
                default:
                    value = string.Empty;
                    break;
            }

            return value;
        }

        public static string ToQuery(int value)
        {
            string query;
            switch (value)
            {
                case 1:
                    query = "SELECT status AS 'Field', count(status) AS 'Count' FROM vw_registro GROUP BY 1 ORDER BY status ASC";
                    break;
                case 2:
                    query = "SELECT tipo AS 'Field', count(tipo) AS 'Count' FROM vw_registro GROUP BY 1 ORDER BY tipo ASC ";
                    break;
                default:
                    query = string.Empty;
                    break;
            }

            return query;
        }
     
    }
}
