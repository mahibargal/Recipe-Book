import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
recipes:Recipe[];
@Output()recipeWasSelected = new EventEmitter<Recipe>();

  constructor(private recipeServ:RecipeService, 
              private router:Router, 
              private activeRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.recipes = this.recipeServ.getRecipe();
  }
  addNewRecipe(){
this.router.navigate(['new'],{relativeTo:this.activeRoute});
  }
}
