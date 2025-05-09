import { newE2EPage } from '@stencil/core/testing';

describe('xpoky-ambulance-wl-app', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<xpoky-ambulance-wl-app></xpoky-ambulance-wl-app>');

    const element = await page.find('xpoky-ambulance-wl-app');
    expect(element).toHaveClass('hydrated');
  });
});
