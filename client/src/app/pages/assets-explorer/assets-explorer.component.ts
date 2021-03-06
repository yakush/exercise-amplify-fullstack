import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { map, Observable, Subscription } from 'rxjs';
import { NewAssetComponent } from 'src/app/dialogs/new-asset/new-asset.component';
import { AssetsApiService } from 'src/app/services/assets-api.service';
import { IAsset } from 'src/data/models/asset';

@Component({
  selector: 'app-assets-explorer',
  templateUrl: './assets-explorer.component.html',
  styleUrls: ['./assets-explorer.component.css'],
})
export class AssetsExplorerComponent implements OnInit, OnDestroy {
  assets$!: Observable<IAsset[]>;
  hasAssets$!: Observable<boolean>;

  public loadingAssets = true;
  public loadingAssetsError = false;

  constructor(
    private router: Router,
    private api: AssetsApiService,
    private dialogsMgr: MatDialog
  ) {}

  ngOnInit(): void {
    this.getAssets();
  }

  ngOnDestroy(): void {}

  getAssets() {
    this.loadingAssets = true;
    this.loadingAssetsError = false;

    this.assets$ = this.api.getAssets();
    this.hasAssets$ = this.assets$.pipe(map((x) => x && x.length > 0));

    const subLoading = this.assets$.subscribe((res) => {
      subLoading.unsubscribe();
      this.loadingAssets = false;
      this.loadingAssetsError = !res;
    });
  }

  openDialogNewAsset() {
    const dialogRef = this.dialogsMgr.open(NewAssetComponent);

    let sub = dialogRef.afterClosed().subscribe((result) => {
      sub.unsubscribe();
      if (result) {
        console.log(`Dialog result: ${JSON.stringify(result)}`);
        //refresh
        this.getAssets();
      }
    });
  }

  handleItemClick(asset: IAsset) {
    this.router.navigate(['/assets-explorer', asset._id]);
  }

  handleAddClick(event: any) {
    this.openDialogNewAsset();
  }
}
