import { EventEmitter, Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Recipe } from "./recipe.model";

@Injectable()
export class RecipeService{
   private recipes:Recipe[] = [
        new Recipe('A test recipe','this a simply test','https://th.bing.com/th/id/OIP.Zn_B96YSAVNC8A-hjoXJ9AHaE4?rs=1&pid=ImgDetMain',
        [
new Ingredient('meat',2),
new Ingredient('potato',2),
        ]),
        new Recipe('A second test recipe','this a simply second test','https://d1dd4ethwnlwo2.cloudfront.net/wp-content/uploads/2016/12/Roasted-Balsamic-Cranberry-Chicken-Horizontal-1.jpg',
        [
          new Ingredient('meat',2),
          new Ingredient('tomato',2),
        ])
      ];
// recipeSelected  = new Subject<Recipe>();
constructor(private shoppingServ:ShoppingListService){

}
      getRecipe(){
        return this.recipes.slice();
      }

      getRecipeWithIndex(index:number){
        return this.recipes[index];
      }
      addIngredientToShoppingList(ingredient){
      this.shoppingServ.addIngredientFromRecipe(ingredient)
      }
}