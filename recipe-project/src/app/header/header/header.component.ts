import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
// @Output() featurSelected = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }

  //no need of event as handles by routing
  // onSelect(key:string){
  //   this.featurSelected.emit(key);  
  // }
}
