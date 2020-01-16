import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { EventModel, EventType } from 'src/app/models/event-model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.css']
})
export class EventDetailsComponent implements OnInit {

  router : Router;
  @Input('event') event : EventModel;
  @Input('eventTypes') eventTypes: Map<number,EventType>;
  @Input('eventImages') eventImages : Map<number,string>;
  @Output() hideClicked = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

  hideClick(){
    this.hideClicked.emit('hideClicked');
  }
  
  getEventType(val){
    //to battle some weird events where type is string
    return this.eventTypes.get(Number.parseInt(val));
  }
  
}
