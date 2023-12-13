import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthentificationRoutingModule } from './authentification-routing.module';

import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { LogoutComponent } from './logout/logout.component';
import { RegisterComponent } from './register/register.component';

@NgModule({
declarations: [
LoginComponent,
LogoutComponent,
RegisterComponent
],
imports: [
CommonModule,
AuthentificationRoutingModule,
FormsModule,
]
})
export class AuthentificationModule { }