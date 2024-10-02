import { Component, OnInit } from '@angular/core';
import { DatacenterService } from 'src/app/services/datacenter/datacenter.service';
import { NetworkService } from 'src/app/services/network/network.service';

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

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {

  assets: Asset[] = [];
  activeCount: number = 0;
  expiredCount: number = 0;
  totalCount: number = 0;
  totalVMCount: number = 0;
  totalNetworkCount: number = 0;
  totalOldCount: number = 0;
  totalDMZCount: number = 0;
  totalBBCount: number = 0;
  totalMZCount: number = 0;
  totalSwiftCount: number = 0;
  totalExtranetCount: number = 0;
  vms: any[] = [];
  filteredVMs: any[] = [];
  networkAssets: any[] = [];
  filteredAssets: any[] = [];
  originalNetworkAssets: any[] = [];

  constructor(
    private datacenterService: DatacenterService,
    private networkService: NetworkService
  ) { }

  ngOnInit(): void {
    this.loadAssets();
    this.loadVM();
    this.loadNetworkAssets();
  }

  loadAssets() {
    this.datacenterService.getAssets().subscribe(data => {
      this.assets = data;
      this.totalCount = this.assets.length; // Get the total number of assets
      this.countAmcStatus();
    });
  }

  countAmcStatus() {
    this.activeCount = this.assets.filter(asset => asset.amc_status === 'Active').length;
    this.expiredCount = this.assets.filter(asset => asset.amc_status === 'Expired').length;
  }

  loadVM() {
    this.datacenterService.getAllVMs().subscribe(data => {
      this.vms = data.sort((a, b) => a.asset_application_name.localeCompare(b.asset_application_name));
      this.filteredVMs = [...this.vms];
      this.totalVMCount = this.filteredVMs.length;

    });
  
  }

  loadNetworkAssets() {
    this.networkService.getAllNetworkAssets().subscribe(
      (data) => {
        this.networkAssets = data;
        this.originalNetworkAssets = [...data]; // Store a copy of the original data
        console.log(this.networkAssets);
        this.totalNetworkCount = this.originalNetworkAssets.length;
        this.countZoneStatus()
      },
      (error) => {
        console.error('Error fetching network assets', error);
      }
    );
  }

  countZoneStatus() {
    this.totalOldCount = this.networkAssets.filter(asset => asset.zone === 'Old').length;
    this.totalDMZCount = this.networkAssets.filter(asset => asset.zone === 'DMZ').length;
    this.totalBBCount = this.networkAssets.filter(asset => asset.zone === 'BB').length;
    this.totalMZCount = this.networkAssets.filter(asset => asset.zone === 'MZ').length;
    this.totalExtranetCount = this.networkAssets.filter(asset => asset.zone === 'Extranet').length;
    this.totalSwiftCount = this.networkAssets.filter(asset => asset.zone === 'SWIFT').length;
  
  }

}
