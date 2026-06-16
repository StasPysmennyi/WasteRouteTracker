describe('Tab navigation', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('shows all three tabs on launch', async () => {
    await expect(element(by.label('tab-map'))).toBeVisible();
    await expect(element(by.label('tab-routes'))).toBeVisible();
    await expect(element(by.label('tab-stats'))).toBeVisible();
  });

  it('switches to the routes tab', async () => {
    await element(by.label('tab-routes')).tap();
    await expect(element(by.label('tab-routes'))).toBeVisible();
  });

  it('switches to the stats tab', async () => {
    await element(by.label('tab-stats')).tap();
    await expect(element(by.label('tab-stats'))).toBeVisible();
  });
});
