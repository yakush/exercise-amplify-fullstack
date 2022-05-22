import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { IAsset } from 'src/data/models/asset';

@Component({
  selector: 'app-assets-list-item',
  templateUrl: './assets-list-item.component.html',
  styleUrls: ['./assets-list-item.component.css'],
})
export class AssetsListItemComponent implements OnInit {
  @Input() asset!: IAsset;
  @Output() itemClick = new EventEmitter<IAsset>();

  constructor() {}

  ngOnInit(): void {}

  handleClick() {
    this.itemClick.emit(this.asset);
  }
}
