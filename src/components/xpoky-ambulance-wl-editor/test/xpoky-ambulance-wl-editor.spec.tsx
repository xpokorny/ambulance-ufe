import { newSpecPage } from '@stencil/core/testing';
import { XpokyAmbulanceWlEditor } from '../xpoky-ambulance-wl-editor';
import fetchMock from 'jest-fetch-mock';
import { Appointment } from '../../../api/ambulance-wl';

describe('xpoky-ambulance-wl-editor', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
    // Mock the users API response for patients
    fetchMock.mockResponseOnce(JSON.stringify([
      { id: "1", name: "John Doe", role: "patient" }
    ]));
    // Mock the users API response for doctors
    fetchMock.mockResponseOnce(JSON.stringify([
      { id: "2", name: "Dr. Smith", role: "doctor" }
    ]));
    // Mock the locations API response
    fetchMock.mockResponseOnce(JSON.stringify([
      { id: "1", name: "Main Hospital", address: "123 Main St" }
    ]));
  });

  it('renders', async () => {
    const page = await newSpecPage({
      components: [XpokyAmbulanceWlEditor],
      html: `<xpoky-ambulance-wl-editor api-base="http://localhost/api"></xpoky-ambulance-wl-editor>`,
    });
    await page.waitForChanges();
    expect(page.root).toEqualHtml(`
      <xpoky-ambulance-wl-editor api-base="http://localhost/api">
        <mock:shadow-root>
          <form>
            <md-filled-text-field label="Patient Name"></md-filled-text-field>
            <md-filled-select label="Doctor"></md-filled-select>
            <md-filled-select label="Location"></md-filled-select>
            <md-filled-text-field label="Date and Time" type="datetime-local"></md-filled-text-field>
            <div class="actions">
              <md-filled-button>Save</md-filled-button>
              <md-outlined-button>Cancel</md-outlined-button>
            </div>
          </form>
        </mock:shadow-root>
      </xpoky-ambulance-wl-editor>
    `);
  });

  it('renders with error message', async () => {
    const page = await newSpecPage({
      components: [XpokyAmbulanceWlEditor],
      html: `<xpoky-ambulance-wl-editor api-base="http://localhost/api"></xpoky-ambulance-wl-editor>`,
    });
    const editor = page.rootInstance as XpokyAmbulanceWlEditor;
    editor.errorMessage = "Test error message";
    await page.waitForChanges();
    expect(page.root).toEqualHtml(`
      <xpoky-ambulance-wl-editor api-base="http://localhost/api">
        <mock:shadow-root>
          <div class="error">Test error message</div>
        </mock:shadow-root>
      </xpoky-ambulance-wl-editor>
    `);
  });

  it('renders with appointment data', async () => {
    const appointment: Appointment = {
      id: "1",
      patient: { id: "1", name: "John Doe", role: "patient" },
      doctor: { id: "2", name: "Dr. Smith", role: "doctor" },
      location: { id: "1", name: "Main Hospital", address: "123 Main St" },
      dateTime: new Date("2024-03-20T10:00:00"),
      createdBy: { id: "1", name: "John Doe", role: "patient" }
    };

    const page = await newSpecPage({
      components: [XpokyAmbulanceWlEditor],
      html: `<xpoky-ambulance-wl-editor api-base="http://localhost/api"></xpoky-ambulance-wl-editor>`,
    });
    const editor = page.rootInstance as XpokyAmbulanceWlEditor;
    editor.appointment = appointment;
    await page.waitForChanges();
    expect(page.root).toEqualHtml(`
      <xpoky-ambulance-wl-editor api-base="http://localhost/api">
        <mock:shadow-root>
          <form>
            <md-filled-text-field label="Patient Name" value="John Doe"></md-filled-text-field>
            <md-filled-select label="Doctor" value="2"></md-filled-select>
            <md-filled-select label="Location" value="1"></md-filled-select>
            <md-filled-text-field label="Date and Time" type="datetime-local" value="2024-03-20T10:00"></md-filled-text-field>
            <div class="actions">
              <md-filled-button>Update</md-filled-button>
              <md-filled-tonal-button>Delete</md-filled-tonal-button>
              <md-outlined-button>Cancel</md-outlined-button>
            </div>
          </form>
        </mock:shadow-root>
      </xpoky-ambulance-wl-editor>
    `);
  });
});