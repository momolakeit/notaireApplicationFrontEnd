import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FichierDocumentComponent } from './fichier-document.component';

describe('FichierDocumentComponent', () => {
  let component: FichierDocumentComponent;
  let fixture: ComponentFixture<FichierDocumentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FichierDocumentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FichierDocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
