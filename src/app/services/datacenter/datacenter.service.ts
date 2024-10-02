import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Asset {
  id?: number;
  location: string;
  model: string;
  amc_status: string;
  warranty_expired: string;
  application_name: string;
  os_with_bit: string;
  cpu_core: string;
  ram: string;
  hdd: string;

  os_version: string;
  vendor_remarks: string;
}


@Injectable({
  providedIn: 'root'
})
export class DatacenterService {

  private apiUrl = 'http://11.11.7.41:4000/api/assets';
  private apiUrlVM = 'http://11.11.7.41:4000/api/vms';

  constructor(private http: HttpClient) { }

  getAssets(): Observable<Asset[]> {
    return this.http.get<Asset[]>(this.apiUrl);
  }

  getAsset(id: number): Observable<Asset> {
    return this.http.get<Asset>(`${this.apiUrl}/${id}`);
  }

  createAsset(asset: Asset): Observable<Asset> {
    return this.http.post<Asset>(this.apiUrl, asset);
  }

  updateAsset(id: number, asset: Asset): Observable<Asset> {
    return this.http.put<Asset>(`${this.apiUrl}/${id}`, asset);
  }

  deleteAsset(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getAllVMs(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrlVM);
  }

  getVMById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrlVM}/${id}`);
  }

  createVM(vm: any): Observable<any> {
    return this.http.post<any>(this.apiUrlVM, vm);
  }

  updateVM(id: number, vm: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrlVM}/${id}`, vm);
  }

  deleteVM(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrlVM}/${id}`);
  }
}
