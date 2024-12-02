import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { AuthService } from "./auth.service";


@Component({

    selector: 'app-auth',
    templateUrl: './auth.component.html',

})
export class AuthComponent {
    isLoggedIn: boolean = false;
    errorMsg:string = null;
    isLoading:boolean = false;

    constructor(private authSrvc:AuthService){

    }

    switch() {
        this.isLoggedIn = !this.isLoggedIn
    }
    submitForm(form: NgForm) {
        console.log(form);
        this.errorMsg = ''
        if (!form.valid) return

        const formValue = form.value;
        const email = formValue?.email;
        const password = formValue?.password;
        this.isLoading = true;
        if (this.isLoggedIn) {
            this.authSrvc.signIn(email, password).subscribe((res) => {
                this.isLoading = false;

            }, (err: any) => {
                this.isLoading = false;
                this.errorMsg = err?.error?.error?.message
            })

        } else {
            this.authSrvc.signUp(email, password).subscribe((res) => {
                this.isLoading = false;
            }, (err) => {
                this.isLoading = false;
                this.errorMsg = err?.error?.error?.message
            })
        }
    }
}