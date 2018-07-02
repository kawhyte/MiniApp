import { Vehicle } from './../_models/vehicle';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Http} from '@angular/http';
import 'rxjs/add/operator/map';
import { environment } from '../../environments/environment';
import { SaveVehicle } from '../_models/vehicle';

@Injectable()
export class VehicleService {

 baseUrl = environment.apiUrl;
constructor(private http: HttpClient) { }

getMakes() {
    
    return this.http.get<any[]>(this.baseUrl +'makes')
    .map(res => res);

}

getFeatures(){
    return this.http.get<any[]>(this.baseUrl +'features')
    .map(res => res);
}

getVehicle(id) {
    return this.http.get<any[]>( this.baseUrl +'vehicles/' + id)
      .map(res => res);
  }

  getVehicles(filter) {
     return this.http.get<any[]>( this.baseUrl + 'vehicles' + '?' + this.toQueryString(filter))
           .map(res => res);
       }

  toQueryString(obj) {
    var parts = [];
    for (var property in obj) {
    var value = obj[property];
    if (value != null && value != undefined) 
    parts.push(encodeURIComponent(property) + '=' + encodeURIComponent(value));
    }
        return parts.join('&');
     }



create(vehicle) {
    return this.http.post<any[]>(this.baseUrl +'vehicles', vehicle)
      .map(res => res);
  }

  update(vehicle: SaveVehicle) {
    return this.http.put<SaveVehicle>( this.baseUrl +'vehicles/' + vehicle.id, vehicle)
      .map(res => res);
  }

  delete(id) {
    return this.http.delete(this.baseUrl + 'vehicles/' + id)
      .map(res => res);
  }



 
}
