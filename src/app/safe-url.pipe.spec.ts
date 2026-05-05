import { SafeUrlPipe } from './safe-url.pipe';
import { DomSanitizer, SafeValue } from '@angular/platform-browser';

describe('SafeUrlPipe', () => {
  it('create an instance', () => {
    const sanitizer = {
      sanitize: () => '',
      bypassSecurityTrustHtml: () => ({} as SafeValue),
      bypassSecurityTrustStyle: () => ({} as SafeValue),
      bypassSecurityTrustScript: () => ({} as SafeValue),
      bypassSecurityTrustUrl: () => ({} as SafeValue),
      bypassSecurityTrustResourceUrl: () => ({} as SafeValue)
    } as unknown as DomSanitizer;
    const pipe = new SafeUrlPipe(sanitizer);
    expect(pipe).toBeTruthy();
  });
});
