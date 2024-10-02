import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DcNetworkComponent } from './dc-network.component';

describe('DcNetworkComponent', () => {
  let component: DcNetworkComponent;
  let fixture: ComponentFixture<DcNetworkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DcNetworkComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DcNetworkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
