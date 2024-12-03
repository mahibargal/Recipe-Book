import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "./auth.service";


@Component({

    selector: 'app-auth',
    templateUrl: './auth.component.html',

})
export class AuthComponent {
    isLoggedIn: boolean = false;
    errorMsg:string = null;
    isLoading:boolean = false;

    constructor(
        private authSrvc:AuthService,
        private router:Router
        ){}

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
                this.router.navigate(['/recipies']);

            }, (err: any) => {
                this.isLoading = false;
                this.errorMsg = err?.error?.error?.message
            })

        } else {
            this.authSrvc.signUp(email, password).subscribe((res) => {
                this.isLoading = false;
                this.router.navigate(['/recipies']);
            }, (err) => {
                this.isLoading = false;
                this.errorMsg = err?.error?.error?.message
            })
        }
    }
}