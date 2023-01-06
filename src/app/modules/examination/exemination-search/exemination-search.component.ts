import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-exemination-search',
  templateUrl: './exemination-search.component.html',
  styleUrls: ['./exemination-search.component.css']
})
export class ExeminationSearchComponent implements OnInit {
  value = ""
  numbers : number[] =[1,2,3,4,5,6,7,8,9,2,23,1]
  constructor() { }

  ngOnInit(): void {
  }

}
