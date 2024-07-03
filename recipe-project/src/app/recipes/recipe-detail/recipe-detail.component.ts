import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {

  constructor(private recipeServ:RecipeService, 
              private activeRoute: ActivatedRoute,
              private router: Router) { }
  recipetoShowed:Recipe;
  id:number; // current recipe id
  ngOnInit(): void {

    this.activeRoute.params.subscribe((param: Params) => {
      this.id = +param['id'];

      this.recipetoShowed =  this.recipeServ.getRecipeWithIndex(this.id);
    })

    console.log(this.recipetoShowed)
  }
  addToShoppingList(){
    this.recipeServ.addIngredientToShoppingList(this.recipetoShowed.ingredients);
  }
  editRecipe(){
    this.router.navigate(['edit'], {relativeTo:this.activeRoute});
    // this.router.navigate(['../',this.id,'edit'], {relativeTo:this.activeRoute}); // do the same thing as above 
  }
}
