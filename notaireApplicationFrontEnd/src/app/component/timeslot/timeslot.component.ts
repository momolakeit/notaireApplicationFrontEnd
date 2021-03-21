import { TimeSlot } from './../../model/time-slot';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-timeslot',
  templateUrl: './timeslot.component.html',
  styleUrls: ['./timeslot.component.css']
})
export class TimeslotComponent implements OnInit {

  constructor() { }
  @Input()timeSlot:TimeSlot

  ngOnInit(): void {
  }

}
