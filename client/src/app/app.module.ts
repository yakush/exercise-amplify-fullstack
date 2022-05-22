import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MaterialModule } from './modules/material/material.module';
import { AssetsListComponent } from './components/assets-list/assets-list.component';
import { AssetsListItemComponent } from './components/assets-list-item/assets-list-item.component';
import { ScanListItemComponent } from './components/scan-list-item/scan-list-item.component';
import { ScanListComponent } from './components/scan-list/scan-list.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AssetsExplorerComponent } from './pages/assets-explorer/assets-explorer.component';
import { AssetDetailsComponent } from './pages/asset-details/asset-details.component';
import { NewAssetComponent } from './dialogs/new-asset/new-asset.component';
import { ScanAssetComponent } from './dialogs/scan-asset/scan-asset.component';
import { LayoutComponent } from './layout/layout.component';
import { SidenavListComponent } from './nav/sidenav-list/sidenav-list.component';
import { HeaderComponent } from './nav/header/header.component';
import { AssetCardComponent } from './components/asset-card/asset-card.component';
import { DateComponent } from './components/date/date.component';
import { FlexLayoutModule } from "@angular/flex-layout";

@NgModule({
  declarations: [
    AppComponent,
    AssetsListComponent,
    AssetsListItemComponent,
    ScanListItemComponent,
    ScanListComponent,
    ToolbarComponent,
    DashboardComponent,
    AssetsExplorerComponent,
    AssetDetailsComponent,
    NewAssetComponent,
    ScanAssetComponent,
    LayoutComponent,
    SidenavListComponent,
    HeaderComponent,
    AssetCardComponent,
    DateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FlexLayoutModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
