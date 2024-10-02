import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DcVMComponent } from './dc-vm.component';

describe('DcVMComponent', () => {
  let component: DcVMComponent;
  let fixture: ComponentFixture<DcVMComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DcVMComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DcVMComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
