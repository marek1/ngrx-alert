import { NgrxAlertsPage } from './app.po';

describe('ngrx-alerts App', () => {
  let page: NgrxAlertsPage;

  beforeEach(() => {
    page = new NgrxAlertsPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
