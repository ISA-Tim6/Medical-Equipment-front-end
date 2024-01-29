import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/env/environment';

@Injectable({
  providedIn: 'root'
})
export class LocationSimulatorService {

  constructor(private http: HttpClient) {}

  sendMessage(timeInSeconds: number): Observable<string>{
    return this.http.post<any>(
      environment.apiHost + 'foo/producer', timeInSeconds.toString()
    );
  }
}
