import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
export class SelectComponent implements OnInit {
  @Output() changeStatus = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void {
  }
  change(){
    this.changeStatus.emit(true);
  }


}
