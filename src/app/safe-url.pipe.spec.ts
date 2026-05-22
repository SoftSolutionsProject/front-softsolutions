import { TestBed } from '@angular/core/testing';
import { DomSanitizer } from '@angular/platform-browser';
import { SafeUrlPipe } from './safe-url.pipe';

describe('SafeUrlPipe', () => {
  it('create an instance', () => {
    TestBed.configureTestingModule({});

    const sanitizer = TestBed.inject(DomSanitizer);
    const pipe = new SafeUrlPipe(sanitizer);

    expect(pipe).toBeTruthy();
  });
});
