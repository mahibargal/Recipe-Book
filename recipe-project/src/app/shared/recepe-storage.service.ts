import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Recipe } from "../recipes/recipe.model";
import { RecipeService } from "../recipes/recipe.service";

import { exhaustMap, map, take, tap } from 'rxjs/operators'
import { AuthService } from "../auth/auth.service";

@Injectable({ providedIn: 'root' })
export class DataStorageService {

    constructor(
        private recipeSrvc: RecipeService,
        private http: HttpClient,
        private authSrvc: AuthService
    ) {

    }

    saveRecipeData() {
        const recipes: Recipe[] = this.recipeSrvc.getRecipe();
        console.log('adding recipe')

        return this.http.put('https://code-69c0d-default-rtdb.firebaseio.com/recipes.json', recipes).subscribe((res) => {
            console.log(res);
        })
    }

    fetchRecipeData() {
        console.log('fetching recipe')
        return this.authSrvc.currentUser.pipe(
            take(1),
            exhaustMap(user => {
                const token = user?.getToken;
                return this.http.get<Recipe[]>(
                    'https://code-69c0d-default-rtdb.firebaseio.com/recipes.json',
                    {params: new HttpParams().set('auth', token)}
                )
            }),
            map(respnData => {
                return respnData.map((recipe) => {
                    return { ...recipe, ingredients: recipe?.ingredients ? recipe?.ingredients : [] }
                })
            })
            , tap((res: any) => {
                this.recipeSrvc.assignFetchRecipe(res)
                console.log(res);
            })
        ).subscribe((res) => {
            this.recipeSrvc.assignFetchRecipe(res)
            console.log(res);
        })
    }
}