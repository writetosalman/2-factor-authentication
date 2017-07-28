import { NgModule }                 from '@angular/core';
import { RouterModule, Routes }     from '@angular/router';
import { TwoFactorComponent }       from './two-factor/two-factor.component';
import { LoginComponent }           from "./two-factor/login/login.component";

const routes: Routes = [
    { path: '',             redirectTo: 'home',         pathMatch:  'full' },
    { path: 'home',         component: TwoFactorComponent },
    { path: 'login',        component: LoginComponent },
];
@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
})
export class AppRoutingModule {}