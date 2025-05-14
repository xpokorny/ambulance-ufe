import { newSpecPage } from '@stencil/core/testing';
import { XpokyAmbulanceWlApp } from '../xpoky-ambulance-wl-app';
import fetchMock from 'jest-fetch-mock';

describe('xpoky-ambulance-wl-app', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
    // Mock the API responses
    fetchMock.mockResponseOnce(JSON.stringify([
      { id: "1", name: "John Doe", role: "patient" },
      { id: "2", name: "Dr. Smith", role: "doctor" }
    ]));
    fetchMock.mockResponseOnce(JSON.stringify([
      { id: "1", name: "Main Hospital", address: "123 Main St" }
    ]));
  });

  it('renders editor', async () => {
    const page = await newSpecPage({
      url: 'http://localhost/entry/@new',
      components: [XpokyAmbulanceWlApp],
      html: `<xpoky-ambulance-wl-app base-path="/" api-base="http://localhost/api"></xpoky-ambulance-wl-app>`,
    });
    page.win.navigation = new EventTarget();
    const child = await page.root.shadowRoot.firstElementChild;
    expect(child.tagName.toLocaleLowerCase()).toEqual("xpoky-ambulance-wl-editor");
  });

  it('renders list', async () => {
    const page = await newSpecPage({
      url: 'http://localhost/ambulance-wl/',
      components: [XpokyAmbulanceWlApp],
      html: `<xpoky-ambulance-wl-app base-path="/ambulance-wl/" api-base="http://localhost/api"></xpoky-ambulance-wl-app>`,
    });
    page.win.navigation = new EventTarget();
    const child = await page.root.shadowRoot.firstElementChild;
    expect(child.tagName.toLocaleLowerCase()).toEqual("xpoky-ambulance-wl-list");
  });
});