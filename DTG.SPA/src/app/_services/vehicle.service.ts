import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Http} from '@angular/http';
import 'rxjs/add/operator/map';
import { environment } from '../../environments/environment';

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
}
