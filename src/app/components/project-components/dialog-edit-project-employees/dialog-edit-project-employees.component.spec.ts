import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogEditProjectEmployeesComponent } from './dialog-edit-project-employees.component';

describe('DialogEditProjectEmployeesComponent', () => {
  let component: DialogEditProjectEmployeesComponent;
  let fixture: ComponentFixture<DialogEditProjectEmployeesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogEditProjectEmployeesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogEditProjectEmployeesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
