import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserSneakPeakComponent } from './user-sneak-peak.component';

describe('UserSneakPeakComponent', () => {
  let component: UserSneakPeakComponent;
  let fixture: ComponentFixture<UserSneakPeakComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserSneakPeakComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserSneakPeakComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
