import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ResponsePageable } from '../model/responsePageable.model';
import { Observable } from 'rxjs';
import { Live } from '../model/live.model';


@Injectable({
  providedIn: 'root'
})
export class LiveService {

  apiUrl = 'http://localhost:8080/lives';

  httpOptions = { 
    headers: new HttpHeaders({
    'Content-type':'application/json'
  })
};
  constructor(
    private httpClient: HttpClient
    ) {}

    public getLivesWithFlag(flag: string):Observable<ResponsePageable>{
      return this.httpClient.get<ResponsePageable>(this.apiUrl + '?flag=' + flag )
    }

    public postLives(live: any): Observable<Live>{
      return this.httpClient.post<any>(this.apiUrl, live,this.httpOptions);
    }

}
