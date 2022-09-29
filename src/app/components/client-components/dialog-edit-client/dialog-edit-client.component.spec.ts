import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogEditClientComponent } from './dialog-edit-client.component';

describe('DialogEditClientComponent', () => {
  let component: DialogEditClientComponent;
  let fixture: ComponentFixture<DialogEditClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogEditClientComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogEditClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
