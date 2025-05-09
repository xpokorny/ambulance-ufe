import { newE2EPage } from '@stencil/core/testing';

describe('xpoky-ambulance-wl-editor', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<xpoky-ambulance-wl-editor></xpoky-ambulance-wl-editor>');

    const element = await page.find('xpoky-ambulance-wl-editor');
    expect(element).toHaveClass('hydrated');
  });
});
