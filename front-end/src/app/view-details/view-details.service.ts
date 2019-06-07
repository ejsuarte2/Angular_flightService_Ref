import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {FlightBooking} from '../shared/FlightBooking';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ViewDetailsService {

  constructor(private http: HttpClient) { }

  view(): Observable<FlightBooking[]> {

    return this.http.get<FlightBooking[]>("http://localhost:1020/getallIds");
  }

  delete(id): Observable<any>{

    return this.http.post<any>("http://localhost:1020/delete",{"id":id});
  }
}
