import { Component, OnInit } from '@angular/core';
import { DataStorageService } from 'src/app/shared/recepe-storage.service';

@Component({
  selector: 'app-recipe-start',
  templateUrl: './recipe-start.component.html',
  styleUrls: ['./recipe-start.component.css']
})
export class RecipeStartComponent implements OnInit {

  constructor(private dataSrvc:DataStorageService) { }

  ngOnInit(): void {

    // this.dataSrvc.fetchRecipeData();
  }

}
