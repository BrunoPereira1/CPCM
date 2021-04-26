using System.Collections.Generic;

namespace fabricasw.camara.usuario.api
{
    public class UsuarioService
    {
        private readonly UsuarioRepository _repository;

        public UsuarioService(){ }

        public UsuarioService(UsuarioRepository repository)
        {
            _repository = repository;
        }
        
        public UsuarioVM Insert(ObjetoVM obj)
        {
            Usuario model = obj.ObjToModel();
            _repository.Insert(model);

            UsuarioVM view = obj.Login != " " ? FindUser(obj.Login) : null;
            return view;
        }

        public UsuarioVM Update(ObjetoVM obj)
        {
            Usuario model = obj.ObjToModel();
            _repository.Update(model);
            
            UsuarioVM view = obj.Id > 0 ? Find(obj.Id) : null;
            return view;
        }

        public AuthVM Auth(LoginVM obj)
        {
            AuthVM view = _repository.Auth(obj);
            return view;
        }

        public UsuarioVM Find(int id)
        {
            return _repository.Find(id);
        }

        public UsuarioVM FindUser(string user)
        {
            return _repository.FindUser(user);
        }

        public List<UsuarioVM> List()
        {
            return _repository.List();
        }        

        public UsuarioVM Status(int id, string status)
        {
            bool result = _repository.Status(id, status);
            UsuarioVM view = result ? Find(id) : null;            
            return view;
        }

        public UsuarioVM Reset(int id)
        {
            bool result = _repository.Reset(id);
            UsuarioVM view = result ? Find(id) : null;
            return view;
        }

    }
}
