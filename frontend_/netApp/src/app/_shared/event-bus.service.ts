import { Injectable } from '@angular/core';
import { BehaviorSubject, filter, map, Observable, Subject, Subscription, switchMap } from 'rxjs';
import { EventData } from './events';

@Injectable({
  providedIn: 'root'
})
export class EventBusService {

  private bus_subject:BehaviorSubject<any> = new BehaviorSubject<any>(null);
  bus_observable: Observable<any> = this.bus_subject.asObservable() //this is some observable 
  private subject:Subject<any> = new Subject<any>()
  constructor() { }

  emit(event:EventData){
    //console.log("emitting event data", event.name)
   // this.bus_subject.next(event)  //adding event data to observable
    this.bus_subject.next(event)
  }

  on(eventName: string, action){
                                //listening specific event
                                
    return this.bus_subject.pipe(
    
      filter((ev:EventData) => (ev!=null) && (ev.name === eventName)),
      map((e:EventData) => e["value"])

    ).subscribe(action)
    
  }
}
