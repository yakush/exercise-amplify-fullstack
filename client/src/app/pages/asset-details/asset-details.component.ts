import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { map, Observable, Subscription, switchMap } from 'rxjs';
import { ScanAssetComponent } from 'src/app/dialogs/scan-asset/scan-asset.component';
import { AssetsApiService } from 'src/app/services/assets-api.service';
import { IAsset } from 'src/data/models/asset';
import { IScan } from 'src/data/models/scan';

@Component({
  selector: 'app-asset-details',
  templateUrl: './asset-details.component.html',
  styleUrls: ['./asset-details.component.css'],
})
export class AssetDetailsComponent implements OnInit, OnDestroy {
  subs: Subscription[] = [];

  public selectedId?: string;
  public currentAsset: IAsset | undefined;

  public asset$!: Observable<IAsset>;
  public scans$!: Observable<IScan[]>;
  public hasScans$!: Observable<boolean>;

  constructor(
    private route: ActivatedRoute,
    private api: AssetsApiService,
    private dialogsMgr: MatDialog
  ) {}

  ngOnInit(): void {
    this.getAssets();
    this.getScans();

    // get path params (/:id)
    this.subs.push(
      this.route.params.subscribe((params) => {
        this.selectedId = params['id'];
      })
    );

    this.subs.push(
      this.asset$.subscribe((asset) => (this.currentAsset = asset))
    );
  }

  ngOnDestroy() {
    //unsubscribe all
    this.subs.forEach((s) => s.unsubscribe());
  }

  getAssets() {
    this.asset$ = this.route.paramMap.pipe(
      switchMap((params) => {
        const id = params.get('id') || '';
        return this.api.getAssetById(id);
      })
    );
  }
  getScans() {
    this.scans$ = this.route.paramMap.pipe(
      switchMap((params) => {
        const id = params.get('id') || '';
        return this.api.getScansForAsset(id);
      })
    );
    this.hasScans$ = this.scans$.pipe(map((x) => (x && x.length > 0)));
  }

  openDialogScanAsset() {
    const dialogRef = this.dialogsMgr.open(ScanAssetComponent, {
      data: this.currentAsset,
    });

    let sub = dialogRef.afterClosed().subscribe((result) => {
      sub.unsubscribe();
      if (result) {
        console.log(`Dialog result: ${JSON.stringify(result)}`);
        //refresh
        this.getScans();
      }
    });
  }

  handleAddScanClick() {
    this.openDialogScanAsset();
  }
}
