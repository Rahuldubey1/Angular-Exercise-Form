import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ServicesService {
  data:any
  index:any
  constructor(private http:HttpClient) { }
  setIndex(data:any){
    this.index = data
  }

  getIndex(){
    return this.index
  }
  
  setItem(value:any){
    this.data = value
    console.log(this.data)
  }
  getItem(){
    return this.data
  }
  getData():Observable<any>{
    return this.http.get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=28.691999,
    77.174678&radius=1000&key=AIzaSyBRUt034DDEh39RATndvgkQnbIYHOqDfEw`);
  }
}
