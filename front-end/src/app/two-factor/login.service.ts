import { Injectable }               from '@angular/core';
import { Router }                   from '@angular/router';
import { Headers, Http }            from '@angular/http';

import { User }                     from './user';
import { Observable }               from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

@Injectable()
export class LoginService {

    private loginUrl    = 'http://localhost:8000/api/';  // URL to web api
    private headers   = new Headers({'Content-Type': 'application/json'});

    // constructor so that we can get instance of http & router
    constructor(
        private _http:      Http,
        private _router:    Router
    ) { }


    public login(frm: FormData): Observable <String> {
        return this._http.post(this.loginUrl + 'login', frm)
            .map(response => response.json());
    }


    public verify2Factor(frm: FormData): Observable <String> {

        const usr       = this.getUser();
        if ( usr !== null ) {
            const userAuth  = JSON.parse(usr.two_factor_options);
            frm.append('authy:auth:id', usr.id);

            return this._http.post(this.loginUrl + 'token', frm)
                .map(response => response.json());
        }
        else {
            return;
        }
    }

    public saveUser(usr: User) {

        // Save user to login
        localStorage.setItem("user", JSON.stringify(usr));
    }

    public removeLogin() {

        // Remove from local storage
        localStorage.removeItem("user");
        console.log('removeLogin: ', localStorage.getItem('user'))

        // Navigate to login
        this._router.navigate(['home']);
    }

    public getUser(): User {
        let usr = localStorage.getItem("user");

        // If user is not in local storage
        if ( usr === null ) {
            // Navigate
            this._router.navigate(['home']);
            return;
        } else {
            return JSON.parse(usr);
        }
    }

}
