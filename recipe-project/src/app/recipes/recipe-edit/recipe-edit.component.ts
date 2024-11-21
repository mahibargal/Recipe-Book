import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Route, Router } from '@angular/router';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id: number;
  editMode: boolean;
  recipeForm:FormGroup;
  constructor(private activeRoute: ActivatedRoute, private recipeSrv:RecipeService, private router:Router) { }

  ngOnInit(): void {
    this.activeRoute.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.editMode = params['id'] != null;
      console.log(this.editMode);
      this.initForm();
    })

  }

  initForm() {
    let recipeName:any = '';
    let recipeDescription:any = '';
    let imagePath:String = '';
    let ingredients:any = new FormArray([]);


    if(this.editMode){
      const recipe = this.recipeSrv.getRecipeWithIndex(this.id);
      recipeName = recipe?.name;
      imagePath = recipe?.imagePath;
      recipeDescription = recipe?.description;

      //creating form
      for(let ingredient of recipe?.ingredients){
        ingredients.push(
          new FormGroup({
            'name': new FormControl(ingredient?.name,Validators.required),
            'amount': new FormControl(ingredient?.amount,[Validators.required,Validators.pattern('^[1-9]+[0-9]*')])
          })
        )
      }
    }
    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName,Validators.required),
      'description': new FormControl(recipeDescription,Validators.required),
      'imagePath' : new FormControl(imagePath,Validators.required),
      'ingredients':ingredients
    })
  }
  recipeFormSubmit() {
    console.log(this.recipeForm.value)
    if(this.editMode){
      this.recipeSrv.updateRecipe(this.id,this.recipeForm.value) //instead of this.recipeForm.value we can one new object and pass values for new Recipe()
    }else{
      this.recipeSrv.addRecipe(this.recipeForm.value)
    }
    this.onCancel(); //for redirection
  }

  addIngredient() {

    const ingredientsArr = this.recipeForm.get('ingredients') as FormArray;
    ingredientsArr.push(
      new FormGroup({
        'name': new FormControl(null,Validators.required),
        'amount': new FormControl(null,Validators.required)
      })
    );

    //alternative approach
    // (<FormArray>this.recipeForm.get('ingredients')).push(
    //   new FormGroup({
    //     'name': new FormControl(''),
    //     'amount': new FormControl('')
    //   })
    // )
  }

  onCancel(){
    this.router.navigate(['../'],{relativeTo:this.activeRoute})
  }

  deleteIngredient(index:number){
     const ingredient = this.recipeForm.get('ingredients') as FormArray;
     ingredient.removeAt(index);
    //  ingredient.clear() to clear all
  }
}
