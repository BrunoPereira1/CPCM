using System;

namespace fabricasw.camara.usuario.api
{
    public class ObjetoVM
    {
        public int Id { get; set; }
        public string Nome { get; set; }
        public string Fone { get; set; }
        public string Email { get; set; }
        public string Login { get; set; }
        public string Senha { get; set; }
        public string Ativo { get; set; }
        public int Id_funcao { get; set; }
    }
}
