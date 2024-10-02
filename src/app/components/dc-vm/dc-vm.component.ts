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
  selector: 'app-dc-vm',
  templateUrl: './dc-vm.component.html',
  styleUrls: ['./dc-vm.component.css']
})
export class DcVMComponent implements OnInit {

  assets: Asset[] = [];
  vms: any[] = [];
  filteredVMs: any[] = [];
  searchTerm: string = '';
  showModal = false;
  isEditMode = false;
  currentVM: any;
  vmForm: FormGroup;
  userType: string | null = null;


  constructor(
    private datacenterService: DatacenterService,
    private fb: FormBuilder
  ) {
    this.vmForm = this.fb.group({
      asset_id: ['', Validators.required],
      application_name: ['', Validators.required],
      os_version: ['', Validators.required],
      hdd: ['', Validators.required],
      ram: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadVM();
    this.loadAssets();
    this.userType = localStorage.getItem('user_type');
  }

  loadAssets() {
    this.datacenterService.getAssets().subscribe(data => {
      this.assets = data;
    });
  }

  loadVM() {
    this.datacenterService.getAllVMs().subscribe(data => {
      this.vms = data.sort((a, b) => a.asset_application_name.localeCompare(b.asset_application_name));
      this.filteredVMs = [...this.vms]; // Initialize filteredVMs with all VMs

    });
  
  }


  

  searchVMs(): void {
    const lowerTerm = this.searchTerm.toLowerCase();
  
    this.filteredVMs = this.vms.filter(vm => {
      // Convert all properties to strings before applying toLowerCase
      return (
        (vm.asset_location?.toString().toLowerCase().includes(lowerTerm) || '') ||
        (vm.asset_model?.toString().toLowerCase().includes(lowerTerm) || '') ||
        (vm.asset_amc_status?.toString().toLowerCase().includes(lowerTerm) || '') ||
        (vm.application_name?.toString().toLowerCase().includes(lowerTerm) || '') ||
        (vm.os_version?.toString().toLowerCase().includes(lowerTerm) || '') ||
        (vm.asset_cpu_core?.toString().toLowerCase().includes(lowerTerm) || '') ||
        (vm.asset_ram?.toString().toLowerCase().includes(lowerTerm) || '') ||
        (vm.asset_hdd?.toString().toLowerCase().includes(lowerTerm) || '') ||
        (vm.hdd?.toString().toLowerCase().includes(lowerTerm) || '') ||
        (vm.ram?.toString().toLowerCase().includes(lowerTerm) || '')
      );
    });
  }
  
  
  
  

  downloadCSV(): void {
    const headers = [
      'Asset Location', 'Asset Model', 'Asset AMC Status', 'Application Name', 
      'OS Version', 'CPU (CORE)', 'RAM', 'HDD', 
      'VM Application Name', 'VM OS Version', 'VM HDD', 'VM RAM'
    ];

    const csvRows = this.filteredVMs.map(vm => [
      vm.asset_location,
      vm.asset_model,
      vm.asset_amc_status,
      vm.asset_application_name,
      vm.asset_os_version,
      vm.asset_cpu_core,
      vm.asset_ram,
      vm.asset_hdd,
      vm.application_name,
      vm.os_version,
      vm.hdd,
      vm.ram
    ]);

    const csvContent = [
      headers.join(','), // Headers row
      ...csvRows.map(row => row.join(',')) // Data rows
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = window.URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'vm_list.csv');

    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  }

  getRowStyle(applicationName: string, index: number): { [key: string]: string } {
  const isLastItem = this.isLastInGroup(applicationName, index);

  switch (applicationName) {
    case 'Agent Banking Application Server':
      return {
        'background-color': '#c2fffe', 
        
        'border-bottom': isLastItem ? '2px dotted #66cc66' : 'none'  // Red border on last item
      };
 
    case 'BU-CBS- APPS':
      return {
        'background-color': '#ffffcc', 
        
        'border-bottom': isLastItem ? '2px dotted #66cc66' : 'none'  // Red border on last item
      };
 
    case 'Go Smart Application Server':
      return {
        'background-color': '#c2fffe', 
        
        'border-bottom': isLastItem ? '2px dotted #66cc66' : 'none'  // Red border on last item
      };
    case 'Miscellaneous':
      return {
        'background-color': '#ccffcc', 
        
        'border-bottom': isLastItem ? '2px dotted #66cc66' : 'none'  // Red border on last item
      };
    case 'FILE+WIT+NTP':
      return {
        'background-color': '#ffcccc', 
        
        'border-bottom': isLastItem ? '2px dotted #66cc66' : 'none'  // Red border on last item
      };

      case 'ABC+ADC+IB+ITCL':
        return {
          'background-color': '#d9e7fa', 
          
          'border-bottom': isLastItem ? '2px dotted #66cc66' : 'none'  // Red border on last item
        };
      
        case 'Internet Banking':
          return {
            'background-color': '#e6f5f0', 
            
            'border-bottom': isLastItem ? '2px dotted #66cc66' : 'none'  // Red border on last item
          };

          case 'Agent Banking':
            return {
              'background-color': '#f8fae3', 
              
              'border-bottom': isLastItem ? '2px dotted #66cc66' : 'none'  // Red border on last item
            };
            case 'New-Utility':
              return {
                'background-color': '#f8fae3', 
                
                'border-bottom': isLastItem ? '2px dotted #66cc66' : 'none'  // Red border on last item
              };
              case 'RTGS':
                return {
                  'background-color': '#e6f5f0', 
                  
                  'border-bottom': isLastItem ? '2px dotted #66cc66' : 'none'  // Red border on last item
                };
   
 

    default:
      return {
        'background-color': '#ffffff',  // Default white
        'border-bottom': isLastItem ? '2px dotted #66cc66' : 'none'  // Default black border on last item
      };
  }
}

  
  isLastInGroup(applicationName: string, index: number): boolean {
    const nextItem = this.vms[index + 1];
    return !nextItem || nextItem.asset_application_name !== applicationName;
  }
  

  openModal(vm?: any) {
    this.showModal = true;
    this.isEditMode = !!vm;
    this.currentVM = vm;

    if (vm) {
      this.vmForm.patchValue({
        ...vm,
        asset_id: vm.asset_id,  // Bind asset ID to form control
      });
    } else {
      this.vmForm.reset();
    }
  }

  closeModal() {
    this.showModal = false;
  }

  onSubmit() {
    if (this.vmForm.valid) {
      const formValue = this.vmForm.value;
      if (this.isEditMode) {
        this.datacenterService.updateVM(this.currentVM.id, formValue).subscribe(() => {
          this.loadVM();
          this.closeModal();
        });
      } else {
        this.datacenterService.createVM(formValue).subscribe(() => {
          this.loadVM();
          this.closeModal();
        });
      }
    }
  }

  editVM(vm: any) {
    this.openModal(vm);
  }

  deleteVM(id: number) {
    if (confirm('Are you sure you want to delete this VM?')) {
      this.datacenterService.deleteVM(id).subscribe(() => {
        this.loadVM();
      });
    }
  }

  
}
