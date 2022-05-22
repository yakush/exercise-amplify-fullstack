import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AssetsApiService } from 'src/app/services/assets-api.service';
import { IAsset } from 'src/data/models/asset';

@Component({
  selector: 'app-new-asset',
  templateUrl: './new-asset.component.html',
  styleUrls: ['./new-asset.component.css'],
})
export class NewAssetComponent implements OnInit {
  public data: IAsset = {
    ip: '',
    name: '',
    description: '',
  };

  constructor(
    public dialogRef: MatDialogRef<NewAssetComponent>,
    private api: AssetsApiService
  ) {}

  ngOnInit(): void {}

  handleSubmit() {
    if (!this.data.name) {
      return;
    }

    if (!this.data.ip) {
      return;
    }

    let sub = this.api.addAsset(this.data).subscribe((result) => {
      sub.unsubscribe();
      this.dialogRef.close(result);
    });
  }

  handleCancel() {
    this.dialogRef.close();
  }
}
