using System.Collections.Generic;
using System.Collections.ObjectModel;

namespace DTG.API.Controllers.Reources
{
    public class MakeResource
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public ICollection<ModelResource> Models { get; set; }

        public MakeResource()
        {
            Models = new Collection<ModelResource>();
        }
    }
}