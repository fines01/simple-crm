import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogEditEmployeeAddressComponent } from './dialog-edit-employee-address.component';

describe('DialogEditEmployeeAddressComponent', () => {
  let component: DialogEditEmployeeAddressComponent;
  let fixture: ComponentFixture<DialogEditEmployeeAddressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogEditEmployeeAddressComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogEditEmployeeAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
