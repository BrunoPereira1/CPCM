using System;

namespace fabricasw.camara.registro.api
{
    public class Agenda
    {
        public int Id { get; set; }
        public int Id_Registro { get; set; }
        public string Status { get; set; }
        public DateTime? Datahora { get; set; }
        public string Observacao { get; set; }
        public string Uu_Id { get; set; }
    }
}
