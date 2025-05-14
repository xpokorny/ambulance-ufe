import { newSpecPage } from '@stencil/core/testing';
import { XpokyAmbulanceWlEditor } from '../xpoky-ambulance-wl-editor';

describe('xpoky-ambulance-wl-editor', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [XpokyAmbulanceWlEditor],
      html: `<xpoky-ambulance-wl-editor 
        api-base="http://localhost:3333" 
        appointment-id="@new"
        logged-user-id="test-user"
        logged-user-name="Test User"
        logged-user-role="doctor">
      </xpoky-ambulance-wl-editor>`,
    });

    expect(page.root).toEqualHtml(`
      <xpoky-ambulance-wl-editor 
        api-base="http://localhost:3333" 
        appointment-id="@new"
        logged-user-id="test-user"
        logged-user-name="Test User"
        logged-user-role="doctor">
        <mock:shadow-root>
          <form>
            <md-filled-select label="Patient" value="test-user" disabled="">
              <md-icon slot="leading-icon">person</md-icon>
            </md-filled-select>
            <md-filled-select label="Doctor" value="">
              <md-icon slot="leading-icon">medical_services</md-icon>
            </md-filled-select>
            <md-filled-select label="Location" value="">
              <md-icon slot="leading-icon">place</md-icon>
            </md-filled-select>
            <div class="datetime-container">
              <md-filled-text-field label="Date" type="date">
                <md-icon slot="leading-icon">calendar_today</md-icon>
              </md-filled-text-field>
              <md-filled-text-field label="Time" type="time">
                <md-icon slot="leading-icon">schedule</md-icon>
              </md-filled-text-field>
            </div>
            <div class="actions">
              <md-filled-button disabled="">Create</md-filled-button>
              <md-outlined-button>Cancel</md-outlined-button>
            </div>
          </form>
        </mock:shadow-root>
      </xpoky-ambulance-wl-editor>
    `);
  });
});