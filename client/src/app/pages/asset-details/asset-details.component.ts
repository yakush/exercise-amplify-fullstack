import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { map, Observable, Subscription, switchMap, tap } from 'rxjs';
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

  public loadingAsset = true;
  public loadingAssetError = false;

  public loadingScans = true;
  public loadingScansError = false;

  public asset$!: Observable<IAsset>;
  public scans$!: Observable<IScan[]>;
  public hasScans$!: Observable<boolean>;

  constructor(
    private route: ActivatedRoute,
    private api: AssetsApiService,
    private dialogsMgr: MatDialog
  ) {}

  ngOnInit(): void {
    this.getAsset();
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

  getAsset() {
    this.loadingAsset = true;
    this.loadingAssetError = false;
    this.asset$ = this.route.paramMap.pipe(
      switchMap((params) => {
        const id = params.get('id') || '';
        return this.api.getAssetById(id);
      }),
      tap((asset) => {
        this.loadingAsset = false;
        this.loadingAssetError = !asset;
      })
    );
  }
  getScans() {
    this.loadingScans = true;
    this.loadingScansError = false;
    this.scans$ = this.route.paramMap.pipe(
      switchMap((params) => {
        const id = params.get('id') || '';
        return this.api.getScansForAsset(id);
      }),
      tap((scans) => {
        this.loadingScans = false;
        this.loadingScansError = !scans;
      })
    );
    this.hasScans$ = this.scans$.pipe(map((x) => x && x.length > 0));
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

  handleRefreshClick() {
    this.getScans();
  }
}
