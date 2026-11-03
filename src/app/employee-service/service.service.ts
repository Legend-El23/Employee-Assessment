import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Employee } from '../models/employee-models';
@Injectable({
  providedIn: 'root'
})
export class ServiceService {
 private readonly apiURL = 'https://jsonplaceholder.typi.code.come/users';
 private employeesSignal = signal<Employee[]>([]);
 employees = this.employeesSignal.asReadonly();

  constructor(private http: HttpClient) {}
    getEmployees(): Observable<Employee[]> {
      return this.http.get<Employee[]>(this.apiURL).pipe(
        tap(employees => {
          this.employeesSignal.set(employees);
        })
      );
    }


  addEmployee(employee: Employee): void {
    this.employeesSignal.update(current => [ ...current,employee]);
  }

}
