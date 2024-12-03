import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { DataStorageService } from 'src/app/shared/recepe-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  // @Output() featurSelected = new EventEmitter();
  private userSubscrip: Subscription;
  isAuthenticated: boolean = false;
  constructor(
    private dataSrvc: DataStorageService,
    private authSrvc: AuthService) { }

  ngOnInit(): void {
    this.userSubscrip = this.authSrvc.currentUser.subscribe((user) => {
      this.isAuthenticated = !!user;
    })
  }

  //no need of event as handles by routing
  // onSelect(key:string){
  //   this.featurSelected.emit(key);  
  // }
  saveRecipeData() {
    this.dataSrvc.saveRecipeData();
  }

  fetchRecipeData() {
    this.dataSrvc.fetchRecipeData();
  }

  ngOnDestroy(): void {
    this.userSubscrip.unsubscribe();
  }

  logout(){
    this.authSrvc.logout();
  }
}
