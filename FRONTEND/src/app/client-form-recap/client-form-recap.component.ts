import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-client-form-recap',
  templateUrl: './client-form-recap.component.html',
  styleUrls: ['./client-form-recap.component.scss']
})
export class ClientFormRecapComponent implements OnInit {

  constructor() { }

  @Input() name : string = "none";
  @Input() surname : string = "none";
  @Input() civilite : string = "none";
  @Input() address : string = "none";
  @Input() city : string = "none";
  @Input() zipCode : string = "none";
  @Input() country : string = "none";
  @Input() email : string = "none";
  @Input() phone : string = "none";
  @Input() login : string = "none";

  ngOnInit(): void {
  }

}
