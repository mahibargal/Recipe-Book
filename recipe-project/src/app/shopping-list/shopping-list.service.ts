import { EventEmitter } from "@angular/core";
import { Subject } from "rxjs";
import { Ingredient } from "../shared/ingredient.model";

export class ShoppingListService {
    private ingredients: Ingredient[] = [
        new Ingredient('Apples', 5),
        new Ingredient('Tomato', 5),
        new Ingredient('Carrot', 5)
    ];
    ingredientsChanged = new Subject<Ingredient[]>();

    getIngredients() {
        return this.ingredients.slice();    //slice makes a copy of ingredients
    }

    addNewIngredient(ingredient) {
        this.ingredients.push(ingredient);
    }
    addIngredientFromRecipe(ingredient){
        debugger;
        // for(let i=0;i<ingredient.length;i++){
        //     this.ingredients.push(ingredient[i]); 
        // }
        this.ingredients.push(...ingredient);
        this.ingredientsChanged.next(this.ingredients.slice()); 
    }
}