import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { ShoppingEditComponent } from "./shopping-edit/shopping-edit.component";
import { ShoppingListComponent } from "./shopping-list.component";
import { ShoppingListRoutingModule } from "./shoppingList-routing.module";

@NgModule({
    declarations:[
        ShoppingListComponent,
        ShoppingEditComponent,
    ],
    imports:[
        CommonModule,
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        ShoppingListRoutingModule
    ],
    exports:[
        // ShoppingListComponent,
        // ShoppingEditComponent,
    ]
})
export class ShoppingListModule{}