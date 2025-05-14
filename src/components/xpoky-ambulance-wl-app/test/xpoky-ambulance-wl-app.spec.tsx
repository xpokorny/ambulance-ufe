import { newSpecPage } from '@stencil/core/testing';
import { XpokyAmbulanceWlApp } from '../xpoky-ambulance-wl-app';
import fetchMock from 'jest-fetch-mock';

describe('xpoky-ambulance-wl-app', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
    fetchMock.mockResponseOnce(JSON.stringify([]));
  });

  it('renders editor', async () => {
    const page = await newSpecPage({
      url: 'http://localhost/entry/@new',
      components: [XpokyAmbulanceWlApp],
      html: `<xpoky-ambulance-wl-app base-path="/" api-base="http://localhost/api"></xpoky-ambulance-wl-app>`,
    });
    page.win.navigation = new EventTarget();
    await page.waitForChanges();
    expect(page.root).toBeTruthy();
  });

  it('renders list', async () => {
    const page = await newSpecPage({
      url: 'http://localhost/ambulance-wl/',
      components: [XpokyAmbulanceWlApp],
      html: `<xpoky-ambulance-wl-app base-path="/ambulance-wl/" api-base="http://localhost/api"></xpoky-ambulance-wl-app>`,
    });
    page.win.navigation = new EventTarget();
    await page.waitForChanges();
    expect(page.root).toBeTruthy();
  });
});