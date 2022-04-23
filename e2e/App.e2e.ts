import { element, expect, by, device } from 'detox';

describe('Example', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('should have notice to open file', async () => {
    await expect(element(by.id('open-up'))).toBeVisible();
  });
});
