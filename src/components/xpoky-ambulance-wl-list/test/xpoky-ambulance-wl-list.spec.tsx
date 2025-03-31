import { newSpecPage } from '@stencil/core/testing';
import { XpokyAmbulanceWlList } from '../xpoky-ambulance-wl-list';

describe('xpoky-ambulance-wl-list', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [XpokyAmbulanceWlList],
      html: `<xpoky-ambulance-wl-list></xpoky-ambulance-wl-list>`,
    });
    
    const wlList = page.rootInstance as XpokyAmbulanceWlList;
    const expectedPatients = wlList?.waitingPatients?.length

    const items = page.root.shadowRoot.querySelectorAll("md-list-item");
    expect(items.length).toEqual(expectedPatients);
  });
});
