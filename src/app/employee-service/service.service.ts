
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';

import { Employee, NewEmployee } from '../models/employee-models';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private readonly apiUrl =
    'https://jsonplaceholder.typicode.com/users';

  private readonly employeesSubject =
    new BehaviorSubject<Employee[]>([]);

  readonly employees$ = this.employeesSubject.asObservable();

  constructor(private http: HttpClient) {}

  getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.apiUrl).pipe(
      tap(employees => this.employeesSubject.next(employees))
    );
  }

  addEmployee(data: NewEmployee): Employee {
    const currentEmployees = this.employeesSubject.value;

    const employee: Employee = {
      id: currentEmployees.length
        ? Math.max(...currentEmployees.map(item => item.id)) + 1
        : 1,
      name: data.name.trim(),
      username: '',
      email: data.email.trim(),
      phone: data.phone.trim(),
      website: '',
      address: {
        street: '',
        suite: '',
        city: data.city.trim(),
        zipcode: '',
        geo: {
          lat: '',
          lng: ''
        }
      },
      company: {
        name: data.company.trim(),
        catchPhrase: '',
        bs: ''
      }
    };

    this.employeesSubject.next([
      employee,
      ...currentEmployees
    ]);

    return employee;
  }

  getEmployeeById(id: number): Employee | undefined {
    return this.employeesSubject.value.find(
      employee => employee.id === id
    );
  }
}
