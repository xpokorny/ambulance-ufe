import { newSpecPage } from '@stencil/core/testing';
import { XpokyAmbulanceWlList } from '../xpoky-ambulance-wl-list';

describe('xpoky-ambulance-wl-list', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [XpokyAmbulanceWlList],
      html: `<xpoky-ambulance-wl-list></xpoky-ambulance-wl-list>`,
    });

    expect(page.root).toEqualHtml(`
      <xpoky-ambulance-wl-list>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </xpoky-ambulance-wl-list>
    `);
  });
});
