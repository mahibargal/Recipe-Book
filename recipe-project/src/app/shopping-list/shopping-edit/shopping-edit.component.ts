import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {
//  @ViewChild('amountInput') amountInput:ElementRef;
//  @ViewChild('nameInput') nameInput:ElementRef;
 @Output() ingredientAdded = new EventEmitter<Ingredient>();
  constructor(private shoppingServ:ShoppingListService) { }

  ngOnInit(): void {
  }

addIngredient(form:NgForm){

  if(form.valid){

  const value:any = form.value;
  const amount = value.amount  //this.amountInput.nativeElement.value;
  const name = value.name //this.nameInput.nativeElement.value;
  let ingredient:any = new Ingredient(name,amount);
  this.shoppingServ.addNewIngredient(ingredient);
  this.shoppingServ.ingredientsChanged.next(ingredient);
  // this.ingredientAdded.emit(ingredient);
  }
}

}
