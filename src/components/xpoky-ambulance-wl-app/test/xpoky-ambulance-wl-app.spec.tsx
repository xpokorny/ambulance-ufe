import { newSpecPage } from '@stencil/core/testing';
import { XpokyAmbulanceWlApp } from '../xpoky-ambulance-wl-app';

describe('xpoky-ambulance-wl-app', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [XpokyAmbulanceWlApp],
      html: `<xpoky-ambulance-wl-app></xpoky-ambulance-wl-app>`,
    });

    expect(page.root).toEqualHtml(`
      <xpoky-ambulance-wl-app>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </xpoky-ambulance-wl-app>
    `);
  });
});