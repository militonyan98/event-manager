import { Component, OnInit, Input } from '@angular/core';
import { EventModel } from 'src/app/models/event-model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.css']
})
export class EventDetailsComponent implements OnInit {

  router : Router;
  @Input('event') event : EventModel;
  constructor() { }

  ngOnInit() {
  }
  
}
