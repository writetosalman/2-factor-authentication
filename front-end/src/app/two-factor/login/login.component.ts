import { Component, OnInit }                from '@angular/core';
import {AbstractControl, FormBuilder, Validators}       from "@angular/forms";
import {Router}                             from "@angular/router";
import {LoginService}                       from "../login.service";
import {User}                               from "../user";

@Component({
  selector:     'app-login',
  templateUrl:  './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit {

    private user:       User;
    public errorMsg:    string;
    public successMsg:  string;
    public loading:     boolean;
    public salForm;

    // Form Fields
    twoFactorNumber:    AbstractControl;

    constructor(
        private _loginService:    LoginService,
        private _fb:              FormBuilder,
        private _router:          Router,
    ) {

    // Set loading to be false
    this.loading = false;

    // Initialize variables
    this.errorMsg   = '';
    this.successMsg = '';

    // Add some validation
    this.salForm = _fb.group({
        'twoFactorNumber':    ['', Validators.required],
    });

    // We assign this.name after we’ve created ksForm with the FormBuilder
    this.twoFactorNumber    = this.salForm.controls['twoFactorNumber'];
    }

    ngOnInit() {
    }

}
