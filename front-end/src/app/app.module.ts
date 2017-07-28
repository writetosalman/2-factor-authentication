import { BrowserModule }            from '@angular/platform-browser';
import { NgModule }                 from '@angular/core';
import { FormsModule, ReactiveFormsModule }
                                    from '@angular/forms';
import { HttpModule }               from '@angular/http';
import { AppRoutingModule }         from './app-routing.module';
import {LoginService}               from "./two-factor/login.service";

import { AppComponent }             from './app.component';
import { TwoFactorComponent }       from './two-factor/two-factor.component';
import { LoginFormComponent }       from './two-factor/login-form/login-form.component';
import { RegisterFormComponent }    from './two-factor/register-form/register-form.component';
import { LoginComponent } from './two-factor/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    TwoFactorComponent,
    LoginFormComponent,
    RegisterFormComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [LoginService],
  bootstrap: [AppComponent]
})
export class AppModule { }
