/// <reference types="jasmine" />

import { EmployeeService } from './service.service';
import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';


describe('ServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });

  });

  it('should be created', () => {
    const service = TestBed.inject(EmployeeService);
    expect(service).toBeTruthy();
  });
});
