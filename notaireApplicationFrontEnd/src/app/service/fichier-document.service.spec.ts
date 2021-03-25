import { TestBed } from '@angular/core/testing';

import { FichierDocumentService } from './fichier-document.service';

describe('FichierDocumentService', () => {
  let service: FichierDocumentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FichierDocumentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
