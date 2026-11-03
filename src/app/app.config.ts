
import { ApplicationConfig } from '@angular/core';
import { provideRouter, Routes } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';

import { routes } from './app.routes';

export const appConfig = {
  providers: [
    provideRouter(routes as Routes),
    provideHttpClient()
  ]
};
