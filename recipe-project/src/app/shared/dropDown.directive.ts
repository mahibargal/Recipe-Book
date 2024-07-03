import { Directive, HostBinding, HostListener } from "@angular/core";
@Directive({
    selector:'[appDropdown]'
})
export class dropdownDirectiv{
@HostBinding('class.open')  isOpen:boolean = false;
@HostListener('click') toggleOpen(){
this.isOpen = !this.isOpen;
}
}