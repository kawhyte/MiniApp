using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;
using DTG.API.Models;

namespace DTG.API.Dtos
{


    public class VehicleDto
    {
          public int Id { get; set; }
        public int ModelId { get; set; }
    
        public bool IsRegistered { get; set; }
        [Required]
        [StringLength(255)]
        public string ContactName { get; set; }

        [StringLength(255)]
        public string ContactEmail { get; set; }

        [Required]
        [StringLength(255)]
        public string ContactPhone { get; set; }
        [Required]
        public ContactResource Contact{get; set;}
        public ICollection<int> Features { get; set; }

        public VehicleDto()
        {
            Features =  new Collection <int> ( );
        }

    }
}