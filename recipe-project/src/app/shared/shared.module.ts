import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { AlertComponent } from "./alert/alert.component";
import { dropdownDirectiv } from "./dropDown.directive";
import { PlaceholderDirective } from "./placeholder/placeholder.directive";
import { SpinnerComponent } from "./spinner/spinner.component";

@NgModule({
    declarations: [
        dropdownDirectiv,
 SpinnerComponent,
    AlertComponent,
    PlaceholderDirective
    ],
    imports: [
        CommonModule
    ],
    exports: [
        SpinnerComponent,
        AlertComponent,
        PlaceholderDirective,
        dropdownDirectiv
    ],
    // entryComponents: [AlertComponent]

})

export class SharedModule { }