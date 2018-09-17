import { AppPage } from './app.po';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should have correct title', () => {
    page.navigateTo();
    expect(page.getElementById('title').getText()).toEqual('Data Tracker');
  });
});
