import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http:HttpClient) { }

  postEmployeeDetails(data:any):Observable<any>{
   return  this.http.post('http://localhost:3000/employee',data);
  }
  updateEmployeeDetails(id:number,data:any):Observable<any>{
    return  this.http.put(`http://localhost:3000/employee/${id}`,data);
   }
  getEmployeeDetails(){
    return this.http.get('http://localhost:3000/employee');
  }
  deleteEmployeeDetails(id:any){
    return this.http.delete('http://localhost:3000/employee'+'/'+id);
  }
}
