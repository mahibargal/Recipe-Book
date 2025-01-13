import { Component, ComponentFactoryResolver, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "./auth.service";
import { AlertComponent } from "../shared/alert/alert.component";
import { PlaceholderDirective } from "../shared/placeholder/placeholder.directive";
import { Subscription } from "rxjs";


@Component({

    selector: 'app-auth',
    templateUrl: './auth.component.html',

})
export class AuthComponent implements OnInit, OnDestroy {
    isLoggedIn: boolean = false;
    errorMsg:string = null;
    isLoading:boolean = false;
    @ViewChild(PlaceholderDirective) alertHost:PlaceholderDirective;
    private closeSub:Subscription

    constructor(
        private authSrvc:AuthService,
        private router:Router,
        private cmpFatoryResolver:ComponentFactoryResolver
        ){}

        ngOnInit(): void {
                  

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
                this.router.navigate(['/recipies']);

            }, (err: any) => {
                this.isLoading = false;
                this.errorMsg = err?.error?.error?.message;
                this.showAlertCmp(this.errorMsg);
            })

        } else {
            this.authSrvc.signUp(email, password).subscribe((res) => {
                this.isLoading = false;
                this.router.navigate(['/recipies']);
            }, (err) => {
                this.isLoading = false;
                this.errorMsg = err?.error?.error?.message;
                this.showAlertCmp(this.errorMsg);
            })
        }
    }

    showAlertCmp(msg: string) {
        //componnet created
        const alertCmpFactory = this.cmpFatoryResolver.resolveComponentFactory(AlertComponent);
        //need a place to attach component

        const hostViewContainerRef = this.alertHost.viewContainerRef;
        hostViewContainerRef.clear();
        const componentRef = hostViewContainerRef.createComponent(alertCmpFactory);
        componentRef.instance.message = msg;
        this.closeSub = componentRef.instance.alertClose.subscribe(() => {
            hostViewContainerRef.clear();
            this.closeSub.unsubscribe()
        })
    }

    ngOnDestroy(): void {
        if(this.closeSub) this.closeSub.unsubscribe(); 
    }
}