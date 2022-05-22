import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IScan } from 'src/data/models/scan';

@Component({
  selector: 'app-scan-list',
  templateUrl: './scan-list.component.html',
  styleUrls: ['./scan-list.component.css'],
})
export class ScanListComponent implements OnInit {
  @Input() scans!: IScan[];
  @Output() itemClick = new EventEmitter<IScan>();

  constructor() {}

  ngOnInit(): void {}

  handleItemClick(scan: IScan) {
    this.itemClick.emit(scan);
  }
}
