import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AssetDetailsComponent } from './pages/asset-details/asset-details.component';
import { AssetsExplorerComponent } from './pages/assets-explorer/assets-explorer.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'assets-explorer', component: AssetsExplorerComponent },
  { path: 'assets-explorer/:id', component: AssetDetailsComponent },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  //{ path: '**',    component: NoContentComponent },
  //{ path: '**', component: PageNotFoundComponent },  // Wildcard route for a 404 page
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
