import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
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
 subscription:Subscription
 editMode:boolean = false;
 editIemIndex:number;
 @ViewChild('f') slForm:NgForm;
  constructor(private shoppingServ:ShoppingListService) { }

  ngOnInit(): void {
   this.subscription =  this.shoppingServ.startedEditing.subscribe((index) => {
      this.editMode = true;
      this.editIemIndex = index;
      const selectedIngredient = this.shoppingServ.getSelectedIngredient(index)
      this.slForm.setValue({
        name: selectedIngredient.name,
        amount: selectedIngredient.amount
      })
    })
  }

addIngredient(form:NgForm){

  if(form.valid){

  const value:any = form.value;
  const amount = value.amount  //this.amountInput.nativeElement.value;
  const name = value.name //this.nameInput.nativeElement.value;
  let ingredient:any = new Ingredient(name,amount);
  if(this.editMode){
    this.shoppingServ.updateIngredient(this.editIemIndex,ingredient)
  }else{
    this.shoppingServ.addNewIngredient(ingredient);
  }
  this.onClear();
  // this.shoppingServ.ingredientsChanged.next(ingredient);

  // this.ingredientAdded.emit(ingredient);
  }
}
onClear(){
  this.editMode = false;
  this.slForm.reset();
}
onDelete(){
  this.shoppingServ.deleteIngredient(this.editIemIndex);
  this.onClear()
}
ngOnDestroy(){
  this.subscription.unsubscribe();
}

}
