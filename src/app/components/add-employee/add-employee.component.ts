import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Employee } from '../../models/employee-models';


@Component({
  selector: 'app-add-employee',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './add-employee.component.html',
  styleUrl: './add-employee.component.css'
})
export class AddEmployeeComponent {
  @Output() closeModal = new EventEmitter<void>();
  @Output() employeeAdded = new EventEmitter<Employee>();

  employeeForm: FormGroup;
  submitted = false;




  constructor(private fb: FormBuilder) {
    this.employeeForm = this.fb.group({
      name: ['', [
  Validators.required,
  Validators.pattern(/^[a-zA-Z\s'-]+$/)
]],
      email: ['', [Validators.required, Validators.email, Validators.pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)]],
      phone: ['', [Validators.required, Validators.pattern(/^\+?[0-9\s\-()]+$/)]],
      username: ['', Validators.required],
      website: ['', Validators.required],
      company: ['', Validators.required],
      city: ['', Validators.required],
      street: ['', Validators.required],
      suite: [''],
      zipcode: ['']
    });
  }

  onSubmit(): void {
    this.submitted = true;
    console.log('Form values:', this.employeeForm.value);

//This helped me to check on the console what the forms needed
// Object.entries(this.employeeForm.controls).forEach(([name, control]) => {
//   if (control.invalid) {
//     console.log(`Invalid field: ${name}`, {
//       value: control.value,
//       errors: control.errors
//     });
//   }
// });

    if (this.employeeForm.invalid) {
      this.employeeForm.markAllAsTouched();
      console.log('Form is invalid. Please correct the errors and try again.');
      return;
    }


    const formValue = this.employeeForm.getRawValue();

    const newEmployee: Employee = {
      id: Date.now(),
      name: formValue.name,
      email: formValue.email,
      phone: formValue.phone,
      username: formValue.username,
      website: formValue.website,
      company: {
        name: formValue.company,
        catchPhrase: '',
        bs: ''
      },
      address: {
        city: formValue.city,
        street: formValue.street,
        suite: formValue.suite ?? '',
        zipcode: formValue.zipcode ?? '',
        geo: { lat: '', lng: '' }
      }
    };

    this.employeeAdded.emit(newEmployee);
    this.closeModal.emit();
    this.employeeForm.reset();
  }

}
