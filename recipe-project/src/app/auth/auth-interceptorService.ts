import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { exhaustMap, take } from "rxjs/operators";
import { AuthService } from "./auth.service";

@Injectable()
export class AuthInterceptorService implements HttpInterceptor{
constructor(private authServc:AuthService){}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
       return  this.authServc.currentUser.pipe(take(1),exhaustMap(user=>{
        if(user){
            const modifiedReq = req.clone({
                params: req.params.append('auth',user.getToken)
            })
            return next.handle(modifiedReq);
        }
        
        return next.handle(req);
       }))

    }
}