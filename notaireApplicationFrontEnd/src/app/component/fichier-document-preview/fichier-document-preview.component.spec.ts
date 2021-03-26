import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FichierDocumentPreviewComponent } from './fichier-document-preview.component';

describe('FichierDocumentPreviewComponent', () => {
  let component: FichierDocumentPreviewComponent;
  let fixture: ComponentFixture<FichierDocumentPreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FichierDocumentPreviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FichierDocumentPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
