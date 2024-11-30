import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { DataStorageService } from 'src/app/shared/recepe-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
// @Output() featurSelected = new EventEmitter();
  constructor(private dataSrvc:DataStorageService) { }

  ngOnInit(): void {
  }

  //no need of event as handles by routing
  // onSelect(key:string){
  //   this.featurSelected.emit(key);  
  // }
  saveRecipeData() {
    this.dataSrvc.saveRecipeData();
  }

  fetchRecipeData(){
    this.dataSrvc.fetchRecipeData();
  }
}
