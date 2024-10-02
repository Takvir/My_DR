import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DcAddComponent } from './dc-add.component';

describe('DcAddComponent', () => {
  let component: DcAddComponent;
  let fixture: ComponentFixture<DcAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DcAddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DcAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
