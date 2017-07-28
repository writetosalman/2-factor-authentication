import { Injectable }               from '@angular/core';
import { Router }                   from '@angular/router';
import { Headers, Http }            from '@angular/http';

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
}
