import { TestBed } from '@angular/core/testing';

import { PdfReportDetailsService } from './pdf-report-details.service';

describe('PdfReportDetailsService', () => {
  let service: PdfReportDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PdfReportDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
