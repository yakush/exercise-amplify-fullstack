import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IAsset } from 'src/data/models/asset';

@Component({
  selector: 'app-assets-list',
  templateUrl: './assets-list.component.html',
  styleUrls: ['./assets-list.component.css'],
})
export class AssetsListComponent implements OnInit {
  @Input() assets!: IAsset[];
  @Output() itemClick = new EventEmitter<IAsset>();

  constructor() {}

  ngOnInit(): void {}

  handleItemClick(asset: IAsset) {
    this.itemClick.emit(asset);
  }
}
