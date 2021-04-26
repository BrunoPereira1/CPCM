using System.Collections.Generic;

namespace fabricasw.camara.registro.api
{
    public class DashboardVM
    {
        public string Title { get; set; }
        public List<DataVM> Data { get; set; }
        public int Count { get; set; }
    }
}
