import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  public gotoHome = new EventEmitter<void>();
  public emitGotoHome():void{
    this.gotoHome.emit();
  }
  
}
