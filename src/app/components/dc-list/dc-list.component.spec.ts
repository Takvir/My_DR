import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DcListComponent } from './dc-list.component';

describe('DcListComponent', () => {
  let component: DcListComponent;
  let fixture: ComponentFixture<DcListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DcListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DcListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
