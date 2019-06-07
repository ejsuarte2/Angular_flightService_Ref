import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
/**Service to talk to the back-end */

@Injectable({
  providedIn: 'root'
})
export class BookFlightService {

  errorMessage: String;
  url = "http://localhost:1020/bookFlight"
  constructor(private http: HttpClient) { }

  getData(data:any) : Observable<any> {
    return <Observable<any>> this.http.post(this.url,data);
  }
}
