import { newSpecPage } from '@stencil/core/testing';
import { XpokyAmbulanceWlList } from '../xpoky-ambulance-wl-list';
import fetchMock from 'jest-fetch-mock';

describe('xpoky-ambulance-wl-list', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
    fetchMock.mockResponseOnce(JSON.stringify([]));
  });

  it('renders', async () => {
    const page = await newSpecPage({
      components: [XpokyAmbulanceWlList],
      html: `<xpoky-ambulance-wl-list api-base="http://localhost/api" logged-user-id="1"></xpoky-ambulance-wl-list>`,
    });
    await page.waitForChanges();
    expect(page.root).toBeTruthy();
  });

  it('renders with error message', async () => {
    const page = await newSpecPage({
      components: [XpokyAmbulanceWlList],
      html: `<xpoky-ambulance-wl-list api-base="http://localhost/api" logged-user-id="1"></xpoky-ambulance-wl-list>`,
    });
    const list = page.rootInstance as XpokyAmbulanceWlList;
    list.errorMessage = "Test error message";
    await page.waitForChanges();
    expect(page.root).toBeTruthy();
  });

  it('renders with appointments', async () => {
    const page = await newSpecPage({
      components: [XpokyAmbulanceWlList],
      html: `<xpoky-ambulance-wl-list api-base="http://localhost/api" logged-user-id="1"></xpoky-ambulance-wl-list>`,
    });
    const list = page.rootInstance as XpokyAmbulanceWlList;
    list.appointments = [];
    await page.waitForChanges();
    expect(page.root).toBeTruthy();
  });
});
