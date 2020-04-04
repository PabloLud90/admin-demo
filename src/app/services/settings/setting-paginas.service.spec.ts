import { TestBed } from '@angular/core/testing';

import { SettingPaginasService } from './setting-paginas.service';

describe('SettingPaginasService', () => {
  let service: SettingPaginasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SettingPaginasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
