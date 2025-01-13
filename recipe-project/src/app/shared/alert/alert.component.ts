import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
    selector:'app-alert',
    templateUrl: './alert.component.html',
    styleUrls: ['./alert.component.css']
})
export class AlertComponent{
@Input() message:string;
@Output() alertClose = new EventEmitter<any>();

close(){
    this.alertClose.emit();
}
}