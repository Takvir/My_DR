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
  selector: 'app-dc-add',
  templateUrl: './dc-add.component.html',
  styleUrls: ['./dc-add.component.css']
})
export class DcAddComponent implements OnInit {

  createAssetForm: FormGroup;
  userType: string | null = null;

  constructor(
    private datacenterService: DatacenterService,
    private formBuilder: FormBuilder
  ) {
    this.createAssetForm = this.formBuilder.group({
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
      // Handle assets if needed
    });
  }

  onSubmit() {
    if (this.createAssetForm.valid) {
      this.datacenterService.createAsset(this.createAssetForm.value).subscribe(response => {
        // Handle response or navigate away after successful creation
        console.log('Asset created successfully:', response);
        this.createAssetForm.reset(); // Reset the form after submission
      });
    }
  }
}
