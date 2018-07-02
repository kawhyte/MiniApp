import { Component, OnInit } from '@angular/core';
import { Vehicle, KeyValuePair } from '../_models/vehicle';
import { VehicleService } from '../_services/vehicle.service';

@Component({
  selector: 'app-vehicle-list',
  templateUrl: './vehicle-list.component.html',
  styleUrls: ['./vehicle-list.component.css']
})
export class VehicleListComponent implements OnInit {

  vehicles: Vehicle[];
  makes: KeyValuePair[];
  filter: any = {};

  constructor(private vehicleService: VehicleService) { }

  ngOnInit() { 
      this.vehicleService.getMakes()
           .subscribe(makes => this.makes = makes);


      this.populateVehicles();
           
  }


 private populateVehicles() {
    this.vehicleService.getVehicles(this.filter)
     .subscribe(vehicles => this.vehicles = vehicles);
 }

  onFilterChange() {
    this.populateVehicles();
  }

   resetFilter() {
      this.filter = {};
      this.onFilterChange();
   }



   sortBy(columnName) {
       if (this.filter.sortBy === columnName) {
          this.filter.isSortAscending = !this.filter.isSortAscending; 
        } else {
          this.filter.sortBy = columnName;
          this.filter.isSortAscending = true;
        }
        this.populateVehicles();
      }
}
