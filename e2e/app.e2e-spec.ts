import { AngularcliRc0Page } from './app.po';

describe('angularcli-rc0 App', () => {
  let page: AngularcliRc0Page;

  beforeEach(() => {
    page = new AngularcliRc0Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
