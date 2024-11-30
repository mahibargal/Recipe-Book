import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Recipe } from "../recipes/recipe.model";
import { RecipeService } from "../recipes/recipe.service";

import{map} from 'rxjs/operators'

@Injectable({providedIn:'root'})
export class DataStorageService{

    constructor(private recipeSrvc:RecipeService,private http:HttpClient){

    }

    saveRecipeData() {
        const recipes: Recipe[] = this.recipeSrvc.getRecipe();

        this.http.put('https://code-69c0d-default-rtdb.firebaseio.com/recipes.json', recipes).subscribe((res) => {
            console.log(res);
        })
    }

    fetchRecipeData(){
        this.http.get<Recipe[]>('https://code-69c0d-default-rtdb.firebaseio.com/recipes.json')
        .pipe(map (respnData=>{
            return respnData.map((recipe)=>{
                return { ...recipe , ingredients:recipe?.ingredients ?recipe?.ingredients : [] }
            })
        
        })
        )
        .subscribe((res) => {
            this.recipeSrvc.assignFetchRecipe(res)
            console.log(res);
        }) 
    }
}