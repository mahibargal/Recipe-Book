import { EventEmitter, Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Recipe } from "./recipe.model";

@Injectable()
export class RecipeService {
  recipeCHanged:any = new Subject<Recipe[]>()
  private recipes: Recipe[] = [
    new Recipe('A test recipe', 'this a simply test', 'https://th.bing.com/th/id/OIP.Zn_B96YSAVNC8A-hjoXJ9AHaE4?rs=1&pid=ImgDetMain',
      [
        new Ingredient('meat', 2),
        new Ingredient('potato', 2),
      ]),
    new Recipe('A second test recipe', 'this a simply second test', 'https://d1dd4ethwnlwo2.cloudfront.net/wp-content/uploads/2016/12/Roasted-Balsamic-Cranberry-Chicken-Horizontal-1.jpg',
      [
        new Ingredient('meat', 2),
        new Ingredient('tomato', 2),
      ])
  ];
  // recipeSelected  = new Subject<Recipe>();
  constructor(private shoppingServ: ShoppingListService) {

  }
  getRecipe() {
    return this.recipes.slice();
  }

  getRecipeWithIndex(index: number) {
    return this.recipes[index];
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipeCHanged.next(this.recipes.slice())
  }

  updateRecipe(index: number, recipe: Recipe) {
    this.recipes[index] = recipe;
    this.recipeCHanged.next(this.recipes.slice())
  }
  deleteRecipe(index:number){
    this.recipes.splice(index,1);
    this.recipeCHanged.next(this.recipes);
  }
  addIngredientToShoppingList(ingredient) {
    this.shoppingServ.addIngredientFromRecipe(ingredient)
  }
}