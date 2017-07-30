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


    /**
     * This function handles the SUBMIT BUTTON event
     * @param frm       any
     *
     */
    public onSubmit(frm: any): void {
        // console.log('Form submitted with values', frm);

        if ( frm.twoFactorNumber === '' ) {
            this.errorMsg = 'Please enter the number received via sms on your mobile phone.';
            return;
        }

        this.loading      = true;
        this.errorMsg     = '';
        this.successMsg   = '';

        // Setup form data
        let formData  = new FormData();
        formData.append('token',      frm.twoFactorNumber);


        // Call the service for login
        this._loginService.verify2Factor(formData).subscribe(
            (success: any) => {                           // success json, if returned with http response status 200
                console.log(success);

                if ( success.token !== null ) {
                    let usr = this._loginService.getUser();
                    usr.token = success.token;

                    // Save User with Token
                    this._loginService.saveUser(usr);
                }

                this._router.navigate(['home']);

                // This setTimeout is only for the demo
                // Once we have real api running we will remove it
                /* setTimeout (() => {
                 this._router.navigate(['login']);
                 }, 400); */

            },
            (error: any) => {                             // error json if returned with other http response status
                //console.log(error);
                if ( error.status === 0 ) {
                    this.errorMsg = 'Unknown error happened while connecting to api.';

                } else {
                    const res = JSON.parse(error._body);
                    this.errorMsg   = res.error;
                }
                this.loading    = false;
            },
            () => {                                       // always called once completed
                this.loading    = false;
            }
        );
    }
}
