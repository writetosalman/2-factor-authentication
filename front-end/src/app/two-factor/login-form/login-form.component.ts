import { Component, OnInit }                            from '@angular/core';
import {AbstractControl, FormBuilder, Validators}       from "@angular/forms";
import {LoginService}                                   from "../login.service";
import {User}                                           from "../user";
import {Router}                                         from "@angular/router";

@Component({
  selector:     'app-login-form',
  templateUrl:  './login-form.component.html',
})

export class LoginFormComponent implements OnInit {

    private user:       User;
    public errorMsg:    string;
    public successMsg:  string;
    public loading:     boolean;
    public salForm;

    // Form Fields
    email:      AbstractControl;
    password:   AbstractControl;

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
            'email':    ['', Validators.required],
            'password': ['', Validators.required],
        });

        // We assign this.name after we’ve created ksForm with the FormBuilder
        this.email    = this.salForm.controls['email'];
        this.password = this.salForm.controls['password'];
    }

    ngOnInit() {
    }


    /**
     * This function handles the SUBMIT BUTTON event
     * @param frm       any
     *
     */
    public onSubmit(frm: any): void {
        // console.log('Form submitted with values', frm);

        if ( frm.email === '' ) {
            this.errorMsg = 'Email is required field.';
            return;
        }

        if ( frm.password === '' ) {
            this.errorMsg = 'Password is required field.';
            return;
        }

        this.loading      = true;
        this.errorMsg     = '';
        this.successMsg   = '';

        // Setup form data
        let formData  = new FormData();
        formData.append('email',      frm.email);
        formData.append('password',   frm.password);

        // Call the service for login
        this._loginService.login(formData).subscribe(
            (success: any) => {                           // success json, if returned with http response status 200
                this.user       = success as User;
                this.successMsg = 'Username/password accepted successfully';

                // This setTimeout is only for the demo
                // Once we have real api running we will remove it
                setTimeout (() => {
                    this._router.navigate(['login']);
                }, 400);

            },
            (error: any) => {                             // error json if returned with other http response status
                var res = JSON.parse(error._body);
                //console.log(res.error);
                this.errorMsg   = res.error;
                this.loading    = false;
            },
            () => {                                       // always called once completed
                this.loading    = false;
            }
        );
    }
}
