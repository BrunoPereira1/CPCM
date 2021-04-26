using System.Collections.Generic;

namespace fabricasw.camara.registro.api
{
    public class RegistroService
    {
        private readonly RegistroRepository _repository;

        public RegistroService(){ }

        public RegistroService(RegistroRepository repository)
        {
            _repository = repository;
        }
        
        public RegistroVM Insert(ObjetoVM obj)
        {
            Registro model = obj.ObjToModel();
            _repository.Insert(model);

            RegistroVM view = obj.Id > 0 ? Find(obj.Id) : null;
            return view;
        }

        public RegistroVM Update(ObjetoVM obj)
        {
            Registro model = obj.ObjToModel();
            _repository.Update(model);

            RegistroLog log = obj.ObjToModelLog();
            _repository.Log(log);

            RegistroVM view = obj.Id > 0 ? Find(obj.Id) : null;
            return view;
        }

        public ProtocoloVM Post(ObjetoVM obj)
        {
            ProtocoloVM protocolo = _repository.Post(obj);                                  
            return protocolo;
        }

        public RegistroVM Search(string uuId)
        {
            RegistroVM view = _repository.Search(uuId);
            return view;
        }

        public RegistroVM Find(int id)
        {
            return _repository.Find(id);
        }

        public List<RegistroVM> List()
        {
            return _repository.List();
        }        

        public RegistroVM Status(int id, int code)
        {
            bool result = _repository.Status(id, code);
            RegistroVM view = result ? Find(id) : null;            
            return view;
        }

        public List<DashboardVM> Dash()
        {
            List<DashboardVM> dashboards = new List<DashboardVM>();
            dashboards.Add(_repository.Dashboard(1));
            dashboards.Add(_repository.Dashboard(2));
            return dashboards;
        }
    }
}
