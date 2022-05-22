import { Component, Input, OnInit } from '@angular/core';
import { IAsset } from 'src/data/models/asset';

@Component({
  selector: 'app-asset-card',
  templateUrl: './asset-card.component.html',
  styleUrls: ['./asset-card.component.css'],
})
export class AssetCardComponent implements OnInit {
  @Input() asset!: IAsset;
  constructor() {}

  ngOnInit(): void {}
}
