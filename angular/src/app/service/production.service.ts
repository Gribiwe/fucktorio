import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ProductionService {

  private baseUrl = 'http://localhost:8080/api/';
  constructor(private http:HttpClient) { }

  getResourceList(isInput: boolean, precisionIndex: string): Observable<any> {
    let params = new HttpParams()
      .set('isInput', isInput)
      .set('precisionIndex', precisionIndex);
    return this.http.get(`${this.baseUrl}`+'resource-list', {params: params});
  }
}
