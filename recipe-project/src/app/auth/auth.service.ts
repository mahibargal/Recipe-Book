import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
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
    user = new Subject<any>();

    constructor(private http: HttpClient) {

    }

    signUp(email: string, password: string) {
        let data = {
            email,
            password,
            returnSecureToken: true
        }
        return this.http.post<signupData>(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${this.apiKey}`, data).pipe(tap(
            respnsData => {
                const expiresDate = new Date(new Date().getTime() + +respnsData?.expiresIn * 1000)
                this.authenticationHandler(respnsData?.email, respnsData?.localId, respnsData?.idToken, expiresDate)
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
                const expiresDate = new Date(new Date().getTime() + +respnsData?.expiresIn * 1000)
                this.authenticationHandler(respnsData?.email, respnsData?.localId, respnsData?.idToken, expiresDate)
            }

        ));;
    }


    authenticationHandler(email:string, localId:string, idToken:string, expiresDate:Date) {
        const user = new UserData(email, localId, idToken, expiresDate);
        this.user.next(user);

    }
}