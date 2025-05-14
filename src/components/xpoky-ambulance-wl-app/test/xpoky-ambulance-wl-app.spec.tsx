import { newSpecPage } from '@stencil/core/testing';
import { XpokyAmbulanceWlApp } from '../xpoky-ambulance-wl-app';

describe('xpoky-ambulance-wl-app', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [XpokyAmbulanceWlApp],
      html: `<xpoky-ambulance-wl-app 
        api-base="http://localhost:3333"
        base-path="/">
      </xpoky-ambulance-wl-app>`,
    });

    expect(page.root).toEqualHtml(`
      <xpoky-ambulance-wl-app api-base="http://localhost:3333" base-path="/">
        <mock:shadow-root>
          <header>
            <md-filled-select label="Logged User">
              <md-icon slot="leading-icon">person</md-icon>
            </md-filled-select>
          </header>
          <xpoky-ambulance-wl-list api-base="http://localhost:3333" logged-user-id="">
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
        </mock:shadow-root>
      </xpoky-ambulance-wl-app>
    `);
  });
});