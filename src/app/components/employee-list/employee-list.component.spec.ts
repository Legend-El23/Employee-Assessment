import { Component, DestroyRef, OnInit, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Observable } from 'rxjs';

import { Employee } from '../../models/employee-models';
import { EmployeeService } from '../../employee-service/service.service';

type SortDirection = 'asc' | 'desc';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [FormsModule],
  template: ''
})
export class EmployeeList implements OnInit {

  private employeeService = inject(EmployeeService);
  private destroyRef = inject(DestroyRef);

  // Component state
  employees = signal<Employee[]>([]);
  searchTerm = signal('');
  sortDirection = signal<SortDirection>('asc');
  selectedEmployee = signal<Employee | null>(null);

  isLoading = signal(false);
  errorMessage = signal('');

  // Search and sort employees
  filteredEmployees = computed(() => {
    const search = this.searchTerm().trim().toLowerCase();

    const filtered = this.employees().filter(employee =>
      employee.name.toLowerCase().includes(search) ||
      employee.email.toLowerCase().includes(search) ||
      employee.company.name.toLowerCase().includes(search) ||
      employee.address.city.toLowerCase().includes(search)
    );

    return [...filtered].sort((a, b) => {
      const comparison = a.name.localeCompare(b.name);

      return this.sortDirection() === 'asc'
        ? comparison
        : -comparison;
    });
  });

  ngOnInit(): void {
    this.loadEmployees();
  }

  // Fetch employees from the API
  loadEmployees(): void {
    this.isLoading.set(true);
    this.errorMessage.set('');

    (this.employeeService.getEmployees() as unknown as Observable<Employee[]>)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (data: Employee[]) => {
          this.employees.set(data);
          this.isLoading.set(false);
        },
        error: () => {
          this.errorMessage.set(
            'Unable to load employees. Please check your connection and try again.'
          );
          this.isLoading.set(false);
        }
      });
  }

  // Update search
  onSearchChange(value: string): void {
    this.searchTerm.set(value);
  }

  // Clear search
  clearSearch(): void {
    this.searchTerm.set('');
  }

  // Toggle sorting direction
  toggleSort(): void {
    this.sortDirection.update(direction =>
      direction === 'asc' ? 'desc' : 'asc'
    );
  }

  // Show employee details
  viewDetails(employee: Employee): void {
    this.selectedEmployee.set(employee);
  }

  // Close employee details
  closeDetails(): void {
    this.selectedEmployee.set(null);
  }
}
