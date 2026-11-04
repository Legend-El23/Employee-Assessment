
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

import { Employee } from '../../models/employee-models';
import { EmployeeService } from '../../employee-service/service.service';
import { AddEmployeeComponent } from '../add-employee/add-employee.component';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, AddEmployeeComponent],
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.css'
})
export class EmployeeListComponent implements OnInit {
  employees: Employee[] = [];
  searchTerm = '';
  sortDirection: 'asc' | 'desc' = 'asc';

  loading = false;
  errorMessage = '';
  showAddEmployeeModal = false;

  constructor(private employeeService: EmployeeService) {}

  ngOnInit(): void {
    this.loadEmployees();
  }

  loadEmployees(): void {
    this.loading = true;
    this.errorMessage = '';

    this.employeeService.getEmployees().subscribe({
      next: employees => {
        this.employees = employees;
        this.loading = false;
      },
      error: () => {
        this.errorMessage =
          'We could not load employees. Please try again.';
        this.loading = false;
      }
    });
  }

  get filteredEmployees(): Employee[] {
    const term = this.searchTerm.trim().toLowerCase();

    return this.employees
      .filter(employee => {
        const searchableFields = [
          employee.name,
          employee.email,
          employee.company.name,
          employee.address.city
        ];

        return searchableFields.some(field =>
          field.toLowerCase().includes(term)
        );
      })
      .sort((a, b) => {
        const result = a.name.localeCompare(b.name);
        return this.sortDirection === 'asc' ? result : -result;
      });
  }

  toggleSort(): void {
    this.sortDirection =
      this.sortDirection === 'asc' ? 'desc' : 'asc';
  }

  clearSearch(): void {
    this.searchTerm = '';
  }

  openAddEmployeeModal(): void { console.log('Opening Add Employee Modal');
    this.showAddEmployeeModal = true;
  }

  closeAddEmployeeModal(): void {
    this.showAddEmployeeModal = false;
  }


  addEmployeeToList(employee: Employee): void {
  this.employees = [employee, ...this.employees];
  this.closeAddEmployeeModal();
}
}
