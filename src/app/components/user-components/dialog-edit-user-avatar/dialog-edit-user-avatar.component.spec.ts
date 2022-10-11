import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogEditUserAvatarComponent } from './dialog-edit-user-avatar.component';

describe('DialogEditUserAvatarComponent', () => {
  let component: DialogEditUserAvatarComponent;
  let fixture: ComponentFixture<DialogEditUserAvatarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogEditUserAvatarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogEditUserAvatarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
