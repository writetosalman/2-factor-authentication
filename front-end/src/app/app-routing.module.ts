import { NgModule }                 from '@angular/core';
import { RouterModule, Routes }     from '@angular/router';
import { TwoFactorComponent }       from './two-factor/two-factor.component';
import { LoginComponent }           from "./two-factor/login/login.component";
import {HomeComponent}              from "./two-factor/home/home.component";

const routes: Routes = [
    { path: '',                     redirectTo: 'login',         pathMatch:  'full' },
    { path: 'login',                component: TwoFactorComponent },
    { path: 'verify-token/:id',     component: LoginComponent },
    { path: 'home',                 component: HomeComponent },
];
@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
})
export class AppRoutingModule {}