import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit ,OnDestroy{
ingredients:any;
igChanged:Subscription
  constructor(private shoppingServ:ShoppingListService) { }

  ngOnInit(): void {  
    this.ingredients = this.shoppingServ.getIngredients();
    this.igChanged = this.shoppingServ.ingredientsChanged.subscribe((ingredient)=>{
      this.ingredients.push(ingredient);   
  })
  }
  // newIngredients(ingredient:Ingredient){
  //   // this.ingredients.push(ingredient);
  // 
//}


  ngOnDestroy(): void {
    this.igChanged.unsubscribe();
  }
}
