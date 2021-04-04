import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RendezVousPreviewComponent } from './rendez-vous-preview.component';

describe('RendezVousPreviewComponent', () => {
  let component: RendezVousPreviewComponent;
  let fixture: ComponentFixture<RendezVousPreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RendezVousPreviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RendezVousPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
