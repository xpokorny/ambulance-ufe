import { newSpecPage } from '@stencil/core/testing';
import { XpokyAmbulanceWlList } from '../xpoky-ambulance-wl-list';

describe('xpoky-ambulance-wl-list', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [XpokyAmbulanceWlList],
      html: `<xpoky-ambulance-wl-list api-base="http://localhost:3333" logged-user-id="test-user"></xpoky-ambulance-wl-list>`,
    });

    expect(page.root).toEqualHtml(`
      <xpoky-ambulance-wl-list api-base="http://localhost:3333" logged-user-id="test-user">
        <mock:shadow-root>
          <div class="appointments-container">
            <h2>My Appointments</h2>
            <md-list></md-list>
            <h2>Created Appointments</h2>
            <md-list></md-list>
          </div>
          <md-filled-icon-button class="add-button">
            <md-icon>add</md-icon>
          </md-filled-icon-button>
        </mock:shadow-root>
      </xpoky-ambulance-wl-list>
    `);
  });
});
