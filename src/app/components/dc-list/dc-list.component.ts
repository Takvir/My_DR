import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatacenterService } from 'src/app/services/datacenter/datacenter.service';

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
  selector: 'app-dc-list',
  templateUrl: './dc-list.component.html',
  styleUrls: ['./dc-list.component.css']
})
export class DcListComponent implements OnInit {

  assets: Asset[] = [];
  updateAssetForm: FormGroup;
  selectedAsset: Asset | null = null;
  showModal = false;
  userType: string | null = null;

  constructor(
    private datacenterService: DatacenterService,
    private formBuilder: FormBuilder
  ) {
    this.updateAssetForm = this.formBuilder.group({
      location: ['', Validators.required],
      model: ['', Validators.required],
      amc_status: ['', Validators.required],
      warranty_expired: ['', Validators.required],
      application_name: ['', Validators.required],
      os_with_bit: ['', Validators.required],
      cpu_core: ['', Validators.required],
      ram: ['', Validators.required],
      hdd: ['', Validators.required],
    
      os_version: ['', Validators.required],
      vendor_remarks: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadAssets();
    this.userType = localStorage.getItem('user_type');
  }

  loadAssets() {
    this.datacenterService.getAssets().subscribe(data => {
      this.assets = data;
    });
  }

  openModal(asset: Asset) {
    this.showModal = true;
    this.selectedAsset = asset;
    this.updateAssetForm.patchValue(asset); // Populate form with asset details
  }

  closeModal() {
    this.showModal = false;
    this.selectedAsset = null;
    this.updateAssetForm.reset();
  }

  onSubmit() {
    if (this.updateAssetForm.valid) {
      const updatedAsset = { ...this.selectedAsset, ...this.updateAssetForm.value };
      if (updatedAsset.id) {
        this.datacenterService.updateAsset(updatedAsset.id, updatedAsset).subscribe(() => {
          this.loadAssets(); // Reload assets after update
          this.closeModal();
        });
      }
    }
  }
}
