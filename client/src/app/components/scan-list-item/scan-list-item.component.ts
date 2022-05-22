import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { IScan } from 'src/data/models/scan';

@Component({
  selector: 'app-scan-list-item',
  templateUrl: './scan-list-item.component.html',
  styleUrls: ['./scan-list-item.component.css'],
})
export class ScanListItemComponent implements OnInit {

  @Input() scan!: IScan;
  @Output() click = new EventEmitter<IScan>();

  constructor() {}

  ngOnInit(): void {}

  handleClick() {
    this.click.emit(this.scan);
  }
}
