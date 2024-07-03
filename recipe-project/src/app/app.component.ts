import { Component } from '@angular/core';
import { Router, Routes } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Recipe Project';
  boolForRecipe:boolean = true;
  constructor(private router:Router){

  }
  // hideShowRecipeShopping(key:string){
  //   if(key=='recipe'){
  //     this.router.navigate(['/'])
  //   }else{
  //     this.router.navigate(['/shopping-list'])

  //   }
  // }
}
