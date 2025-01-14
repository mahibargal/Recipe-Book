import { Component, OnInit } from '@angular/core';
import { DataStorageService } from 'src/app/shared/recepe-storage.service';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css'],
  // providers:[RecipeService]
})
export class RecipesComponent implements OnInit {
  showRecipe:Recipe;
  constructor(private recipeServ:RecipeService,private dataSrvc:DataStorageService) { }

  ngOnInit(): void {
    this.dataSrvc.fetchRecipeData();
    // this.recipeServ.recipeSelected.subscribe((recipe:Recipe)=>{
    //   this.showRecipe = recipe; 
    // })
  }

  // selectedRecipe(recipe){
  //   this.showRecipe = recipe;
  // }
}
