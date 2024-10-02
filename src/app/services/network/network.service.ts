import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NetworkService {
  private apiUrl = 'http://11.11.7.41:4000/api/network-assets'; // API URL

  constructor(private http: HttpClient) {}

  // Get all network assets
  getAllNetworkAssets(): Observable<any> {
    return this.http.get(`${this.apiUrl}`);
  }

  // Get a network asset by ID
  getNetworkAssetById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  // Create a new network asset
  createNetworkAsset(networkAsset: any): Observable<any> {
    return this.http.post(this.apiUrl, networkAsset);
  }

  // Update a network asset by ID
  updateNetworkAsset(id: number, networkAsset: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, networkAsset);
  }

  // Delete a network asset by ID
  deleteNetworkAsset(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
