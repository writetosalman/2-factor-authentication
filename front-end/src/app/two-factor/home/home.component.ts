import { Component, OnInit }  from '@angular/core';
import {LoginService}         from "../login.service";
import {Router}               from "@angular/router";

@Component({
  selector:     'app-home',
  templateUrl:  './home.component.html',
})
export class HomeComponent implements OnInit {

    public msg: string;

    constructor(
        private _loginService:    LoginService,
        private _router:          Router,
                ) {
    this.msg = 'Hurray Logged in successfully...!';
    }

    ngOnInit() {
    }

    public logout() {
        this._loginService.removeLogin();
        this.msg = 'Logged out';

        setTimeout (() => {
            this._router.navigate(['login']);
        }, 400);
    }

}
