import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NetworkService } from 'src/app/services/network/network.service';

@Component({
  selector: 'app-dc-network',
  templateUrl: './dc-network.component.html',
  styleUrls: ['./dc-network.component.css']
})
export class DcNetworkComponent implements OnInit {
  networkAssets: any[] = [];
  assetForm: FormGroup;
  isModalOpen = false;
  isEditing = false;
  currentAssetId: number | null = null;
  filteredAssets: any[] = [];
  searchTerm: string = ''; // Add this line
  originalNetworkAssets: any[] = [];
  userType: string | null = null;

  constructor(private networkService: NetworkService, private fb: FormBuilder) {
    this.assetForm = this.fb.group({
      rack_no: ['', Validators.required],
      device: ['', Validators.required],
      zone: ['', Validators.required],
      brand: ['', Validators.required],
      model: ['', Validators.required],
      serial_number: ['', Validators.required],
      vendor: ['', Validators.required],
      remarks: ['']
    });
  }

  ngOnInit(): void {
    this.loadNetworkAssets();
    this.userType = localStorage.getItem('user_type');
  }

  loadNetworkAssets() {
    this.networkService.getAllNetworkAssets().subscribe(
      (data) => {
        this.networkAssets = data;
        this.originalNetworkAssets = [...data]; // Store a copy of the original data
        console.log(this.networkAssets);
      },
      (error) => {
        console.error('Error fetching network assets', error);
      }
    );
  }
  

  openModal(asset?: any) {
    if (asset) {
      this.isEditing = true;
      this.currentAssetId = asset.id;
      this.assetForm.patchValue(asset);
    } else {
      this.isEditing = false;
      this.currentAssetId = null;
      this.assetForm.reset();
    }
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
    this.assetForm.reset();
  }

  onSubmit() {
    if (this.assetForm.valid) {
      if (this.isEditing && this.currentAssetId) {
        this.networkService.updateNetworkAsset(this.currentAssetId, this.assetForm.value).subscribe(
          () => {
            this.loadNetworkAssets();
            this.closeModal();
          },
          (error) => {
            console.error('Error updating network asset', error);
          }
        );
      } else {
        this.networkService.createNetworkAsset(this.assetForm.value).subscribe(
          () => {
            this.loadNetworkAssets();
            this.closeModal();
          },
          (error) => {
            console.error('Error creating network asset', error);
          }
        );
      }
    }
  }

  deleteAsset(id: number) {
    if (confirm('Are you sure you want to delete this asset?')) {
      this.networkService.deleteNetworkAsset(id).subscribe(
        () => {
          this.loadNetworkAssets();
        },
        (error) => {
          console.error('Error deleting network asset', error);
        }
      );
    }
  }

  getZoneClass(zone: string): string {
    switch (zone) {
        case 'Extranet':
            return 'bg-green-5300'; // Green
        case 'BB':
            return 'bg-blue-300'; // Blue
        case 'MZ':
            return 'bg-yellow-300'; // Yellow
        case 'DMZ':
            return 'bg-gray-300'; // Gray
        case 'SWIFT':
            return 'bg-pink-300'; // Pink
        case 'Old':
            return 'bg-red-400'; // Red
        default:
            return ''; // No background color if zone doesn't match
    }
}

downloadCSV() {
  console.log('Filtered Assets:', this.networkAssets); // Check the contents of filteredAssets
  const csvData = this.convertToCSV(this.networkAssets);
  const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'network_inventory.csv'; // Set the file name
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}


convertToCSV(data: any[]): string {
  const header = 'Rack No,Device,Zone,Brand,Model,Serial Number,Vendor,Remarks\n';
  const rows = data.map(asset => 
    `${asset.rack_no},${asset.device},${asset.zone},${asset.brand},${asset.model},${asset.serial_number},${asset.vendor},${asset.remarks}`
  );
  return header + rows.join('\n');
}


filterAssets() {
  const searchTermLower = this.searchTerm.toLowerCase();
  this.networkAssets = this.originalNetworkAssets.filter(asset => 
    asset.rack_no.toLowerCase().includes(searchTermLower) ||
    asset.device.toLowerCase().includes(searchTermLower) ||
    asset.zone.toLowerCase().includes(searchTermLower) ||
    asset.brand.toLowerCase().includes(searchTermLower) ||
    asset.model.toLowerCase().includes(searchTermLower) ||
    asset.serial_number.toLowerCase().includes(searchTermLower) ||
    asset.vendor.toLowerCase().includes(searchTermLower) ||
    asset.remarks.toLowerCase().includes(searchTermLower)
  );
}



}
