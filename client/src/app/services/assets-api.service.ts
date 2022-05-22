import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, Observable, of, tap } from 'rxjs';

import { IAsset } from 'src/data/models/asset';
import { IScan } from 'src/data/models/scan';
import { API_URL } from '../consts';
import { ApiReply, ApiReplyToData } from 'src/utils/api';

@Injectable({
  providedIn: 'root',
})
export class AssetsApiService {
  private heroesUrl = API_URL; // URL to api
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };
  constructor(private http: HttpClient) {}

  // ASSETS

  getAssets(): Observable<IAsset[]> {
    const url = `${this.heroesUrl}/assets`;
    return this.http.get<ApiReply<IAsset[]>>(url).pipe(
      tap((res) => console.log('got assets', res)),
      map(ApiReplyToData),
      catchError(this.handleError<IAsset[]>('getAssets', []))
    );
  }

  getAssetById(id: string): Observable<IAsset> {
    const url = `${this.heroesUrl}/assets/${id}`;
    return this.http.get<ApiReply<IAsset>>(url).pipe(
      tap((res) => console.log('got asset', res)),
      map(ApiReplyToData),
      catchError(this.handleError<IAsset>('getAssetById'))
    );
  }
  addAsset(asset: IAsset): Observable<IAsset> {
    const url = `${this.heroesUrl}/assets`;
    return this.http.put<ApiReply<IAsset>>(url, asset).pipe(
      tap((res) => console.log('added asset', res)),
      map(ApiReplyToData),
      catchError(this.handleError<IAsset>('addAsset'))
    );
  }

  // SCANS

  getScansForAsset(assetId: string): Observable<IScan[]> {
    const url = `${this.heroesUrl}/scans?asset_ref=${assetId}`;
    return this.http.get<ApiReply<IScan[]>>(url).pipe(
      tap((res) => console.log('got scans', res)),
      map(ApiReplyToData),
      catchError(this.handleError<IScan[]>('getScansForAsset', []))
    );
  }

  addScan(scan: IScan): Observable<IScan> {
    const url = `${this.heroesUrl}/scans`;
    return this.http.put<ApiReply<IScan>>(url, scan).pipe(
      tap((res) => console.log('added scan', res)),
      map(ApiReplyToData),
      catchError(this.handleError<IScan>('addScan'))
    );
  }

  //-------------------------------------------------------
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
