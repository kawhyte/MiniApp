using System.Collections.Generic;
using System.Collections.ObjectModel;
using DTG.API.Models;

namespace DTG.API.Dtos
{
    //Return a vehicle make and all its associated models
    public class MakeDto : KeyValuePairDto
    {
        public ICollection <KeyValuePairDto> Models { get; set; }

        public MakeDto()
        {
            Models = new Collection<KeyValuePairDto>();
        }
    }
}