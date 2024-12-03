import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, Subject } from "rxjs";
import { tap } from "rxjs/operators";
import { appConstants } from "../constants";
import { UserData } from "./user.model";


interface signupData {
    kind: string,
    idToken: string,
    email: string,
    refreshToken: string,
    expiresIn: string,
    localId: string,
    registered?: boolean
}

@Injectable({
    providedIn: 'root'
})


export class AuthService {
    apiKey: string = appConstants.API_KEY;
    currentUser = new BehaviorSubject<UserData>(null);
    autoLogoutTimer;

    constructor(
        private http: HttpClient,
        private router: Router,
    ) {

    }

    signUp(email: string, password: string) {
        let data = {
            email,
            password,
            returnSecureToken: true
        }
        return this.http.post<signupData>(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${this.apiKey}`, data).pipe(tap(
            respnsData => {
                this.authenticationHandler(respnsData?.email, respnsData?.localId, respnsData?.idToken, +respnsData?.expiresIn)
            }

        ));
    }

    signIn(email: string, password: string) {
        let data = {
            email,
            password,
            returnSecureToken: true
        }
        return this.http.post<signupData>(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${this.apiKey}`, data).pipe(tap(
            respnsData => {
                this.authenticationHandler(respnsData?.email, respnsData?.localId, respnsData?.idToken, +respnsData?.expiresIn)
            }

        ));;
    }


    authenticationHandler(email: string, localId: string, idToken: string, expiresIn: number) {
        const expiresDate = new Date(new Date().getTime() + +expiresIn * 1000)

        const user = new UserData(email, localId, idToken, expiresDate);
        this.currentUser.next(user);
        localStorage.setItem('userData', JSON.stringify(user));
        debugger;
        this.autoLogout(expiresIn *1000);


    }

    logout() {
        this.currentUser.next(null);
        localStorage.removeItem('userData');
        this.router.navigate(['/auth']);
        if (this.autoLogoutTimer) { //if user click logout then reset timer
            clearTimeout(this.autoLogoutTimer);
            this.autoLogoutTimer = null;
        }

    }

    autoLogin() {
        const userData: {
            email: string,
            id: string,
            _token: string,
            _tokenExpirationDate: string
        } = JSON.parse(localStorage.getItem('userData'));
        if (userData) {
            const loadedUser = new UserData(userData?.email, userData?.id, userData?._token, new Date(userData?.email));
            if (loadedUser.getToken)
                this.currentUser.next(loadedUser);
                const expiresTIme = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
                this.autoLogout(expiresTIme);

        }

    }

    autoLogout(expresInTIme) {
       this.autoLogoutTimer =  setTimeout(() => {
            this.logout(); 
        }, expresInTIme);
    }
}