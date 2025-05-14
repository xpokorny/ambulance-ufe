import { newSpecPage } from '@stencil/core/testing';
import { XpokyAmbulanceWlList } from '../xpoky-ambulance-wl-list';
import { Appointment } from '../../../api/ambulance-wl';
import fetchMock from 'jest-fetch-mock';

describe('xpoky-ambulance-wl-list', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  it('renders', async () => {
    const page = await newSpecPage({
      components: [XpokyAmbulanceWlList],
      html: `<xpoky-ambulance-wl-list></xpoky-ambulance-wl-list>`,
    });
    expect(page.root).toEqualHtml(`
      <xpoky-ambulance-wl-list>
        <mock:shadow-root>
          <h2>My Appointments</h2>
          <md-list></md-list>
          <h2>Created Appointments</h2>
          <md-list></md-list>
          <md-filled-icon-button class="add-button">
            <md-icon>add</md-icon>
          </md-filled-icon-button>
        </mock:shadow-root>
      </xpoky-ambulance-wl-list>
    `);
  });

  it('renders with error message', async () => {
    const page = await newSpecPage({
      components: [XpokyAmbulanceWlList],
      html: `<xpoky-ambulance-wl-list></xpoky-ambulance-wl-list>`,
    });
    const list = page.rootInstance as XpokyAmbulanceWlList;
    list.errorMessage = "Test error message";
    await page.waitForChanges();
    expect(page.root).toEqualHtml(`
      <xpoky-ambulance-wl-list>
        <mock:shadow-root>
          <div class="error">Test error message</div>
          <md-filled-icon-button class="add-button">
            <md-icon>add</md-icon>
          </md-filled-icon-button>
        </mock:shadow-root>
      </xpoky-ambulance-wl-list>
    `);
  });

  it('renders with appointments', async () => {
    const appointments: Appointment[] = [
      {
        id: "1",
        patient: { id: "1", name: "John Doe", role: "patient" },
        doctor: { id: "2", name: "Dr. Smith", role: "doctor" },
        location: { id: "1", name: "Main Hospital", address: "123 Main St" },
        dateTime: new Date("2024-03-20T10:00:00"),
        createdBy: { id: "1", name: "John Doe", role: "patient" }
      },
      {
        id: "2",
        patient: { id: "3", name: "Jane Smith", role: "patient" },
        doctor: { id: "2", name: "Dr. Smith", role: "doctor" },
        location: { id: "1", name: "Main Hospital", address: "123 Main St" },
        dateTime: new Date("2024-03-20T11:00:00"),
        createdBy: { id: "3", name: "Jane Smith", role: "patient" }
      }
    ];

    const page = await newSpecPage({
      components: [XpokyAmbulanceWlList],
      html: `<xpoky-ambulance-wl-list logged-user-id="1"></xpoky-ambulance-wl-list>`,
    });
    const list = page.rootInstance as XpokyAmbulanceWlList;
    list.appointments = appointments;
    await page.waitForChanges();
    expect(page.root).toEqualHtml(`
      <xpoky-ambulance-wl-list logged-user-id="1">
        <mock:shadow-root>
          <h2>My Appointments</h2>
          <md-list>
            <md-list-item>
              <div slot="headline">Patient: John Doe</div>
              <div slot="supporting-text">Doctor: Dr. Smith</div>
              <div slot="supporting-text">Location: Main Hospital - 123 Main St</div>
              <div slot="supporting-text">Date: 3/20/2024, 10:00:00 AM</div>
              <md-icon slot="start">person</md-icon>
              <span slot="end">
                <md-filled-tonal-button><md-icon>edit</md-icon></md-filled-tonal-button>
                <md-filled-tonal-button><md-icon>delete</md-icon></md-filled-tonal-button>
              </span>
            </md-list-item>
          </md-list>
          <h2>Created Appointments</h2>
          <md-list>
            <md-list-item>
              <div slot="headline">Patient: John Doe</div>
              <div slot="supporting-text">Doctor: Dr. Smith</div>
              <div slot="supporting-text">Location: Main Hospital - 123 Main St</div>
              <div slot="supporting-text">Date: 3/20/2024, 10:00:00 AM</div>
              <md-icon slot="start">person</md-icon>
              <span slot="end">
                <md-filled-tonal-button><md-icon>edit</md-icon></md-filled-tonal-button>
                <md-filled-tonal-button><md-icon>delete</md-icon></md-filled-tonal-button>
              </span>
            </md-list-item>
          </md-list>
          <md-filled-icon-button class="add-button">
            <md-icon>add</md-icon>
          </md-filled-icon-button>
        </mock:shadow-root>
      </xpoky-ambulance-wl-list>
    `);
  });
});
