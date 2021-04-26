using System;

namespace fabricasw.camara.registro.api
{
    public class ObjetoVM
    {
        public int Id { get; set; }
        public string Tipo { get; set; }
        public string Assunto { get; set; }
        public string Mensagem { get; set; }
        public string Nome { get; set; }
        public string Fone { get; set; }
        public string Email { get; set; }
        public DateTime? Registrado_em { get; set; }
        public int Usuario { get; set; }
        public string Uu_Id { get; set; }
    }
}
