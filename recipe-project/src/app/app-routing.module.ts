import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthComponent } from "./auth/auth.component";
import { AuthGuard } from "./auth/autth.guard";
import { RecipeDetailComponent } from "./recipes/recipe-detail/recipe-detail.component";
import { RecipeEditComponent } from "./recipes/recipe-edit/recipe-edit.component";
import { RecipeStartComponent } from "./recipes/recipe-start/recipe-start.component";
import { RecipesComponent } from "./recipes/recipes/recipes.component";
import { ShoppingListComponent } from "./shopping-list/shopping-list.component";

const routes: Routes = [
    {
        path: 'auth', component:AuthComponent
    },
    {
        path: '', redirectTo: 'recipies', pathMatch: 'full'
    },
    // {
    //     path: 'recipies', component: RecipesComponent, canActivate:[AuthGuard], children:[
    //         {path:'',component:RecipeStartComponent},
    //         {path:'new',component:RecipeEditComponent},
    //         {path:':id',component:RecipeDetailComponent},
    //         {path:':id/edit',component:RecipeEditComponent},
            
    //     ]
    // },
    // {
    //     path: 'shopping-list', component: ShoppingListComponent
    // },
]

@NgModule({
    imports:[RouterModule.forRoot(routes)],
    exports:[RouterModule]
})
export class appRoutingModule {


}