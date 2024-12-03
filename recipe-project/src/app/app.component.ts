import { Component, OnInit } from '@angular/core';
import { Router, Routes } from '@angular/router';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Recipe Project';
  boolForRecipe:boolean = true;
  constructor(
    private router: Router,
    private authSrvc: AuthService,
  ) { }
  ngOnInit(): void {
    this.authSrvc.autoLogin();
  }
  // hideShowRecipeShopping(key:string){
  //   if(key=='recipe'){
  //     this.router.navigate(['/'])
  //   }else{
  //     this.router.navigate(['/shopping-list'])

  //   }
  // }
}
