import { newE2EPage } from '@stencil/core/testing';

describe('xpoky-ambulance-wl-list', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<xpoky-ambulance-wl-list></xpoky-ambulance-wl-list>');

    const element = await page.find('xpoky-ambulance-wl-list');
    expect(element).toHaveClass('hydrated');
  });
});
