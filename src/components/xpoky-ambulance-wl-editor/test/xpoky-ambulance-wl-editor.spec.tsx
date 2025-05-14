import { newSpecPage } from '@stencil/core/testing';
import { XpokyAmbulanceWlEditor } from '../xpoky-ambulance-wl-editor';

describe('xpoky-ambulance-wl-editor', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [XpokyAmbulanceWlEditor],
      html: `<xpoky-ambulance-wl-editor></xpoky-ambulance-wl-editor>`,
    });

    expect(page.root).toEqualHtml(`
      <xpoky-ambulance-wl-editor>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </xpoky-ambulance-wl-editor>
    `);
  });
});