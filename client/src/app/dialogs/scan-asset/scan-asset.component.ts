import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AssetsApiService } from 'src/app/services/assets-api.service';
import { IAsset } from 'src/data/models/asset';
import { IScan } from 'src/data/models/scan';
import {
  convertDateToHtmlDateInput,
  convertDateToHtmlTimeInput,
} from 'src/utils/datetime';

@Component({
  selector: 'app-scan-asset',
  templateUrl: './scan-asset.component.html',
  styleUrls: ['./scan-asset.component.css'],
})
export class ScanAssetComponent implements OnInit {
  public data: IScan = {
    asset_ref: '',
    scan_due_date: new Date(),
  };

  public date: String = '';
  public time: String = '';

  constructor(
    public dialogRef: MatDialogRef<ScanAssetComponent>,
    @Inject(MAT_DIALOG_DATA) public asset: IAsset,
    private api: AssetsApiService
  ) {
    //connect ref
    this.data.asset_ref = asset._id || '';

    const now = new Date();
    this.date = convertDateToHtmlDateInput(now);
    this.time = convertDateToHtmlTimeInput(now);
  }

  ngOnInit(): void {}

  handleSubmit() {
    console.log(this.date);
    console.log(this.time);

    if (!this.date) {
      return;
    }
    if (!this.time) {
      return;
    }
    this.data.scan_due_date = new Date(`${this.date} ${this.time}`);

    console.log('adding scan at', this.data.scan_due_date);
    let sub = this.api.addScan(this.data).subscribe((result) => {
      sub.unsubscribe();
      this.dialogRef.close(result);
    });
  }

  handleCancel() {
    this.dialogRef.close();
  }
}
