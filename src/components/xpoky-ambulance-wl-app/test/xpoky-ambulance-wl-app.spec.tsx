import { newSpecPage } from '@stencil/core/testing';
import { XpokyAmbulanceWlApp } from '../xpoky-ambulance-wl-app';
import fetchMock from 'jest-fetch-mock';

describe('xpoky-ambulance-wl-app', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
    // Mock all API calls before component initialization
    fetchMock.mockImplementation((req: Request | string) => {
      const url = typeof req === 'string' ? req : req.url;
      if (url.includes('/api/users')) {
        return Promise.resolve(new Response(JSON.stringify([
          { id: "1", name: "John Doe", role: "patient" },
          { id: "2", name: "Dr. Smith", role: "doctor" }
        ]), {
          status: 200,
          headers: { 'Content-Type': 'application/json' }
        }));
      }
      if (url.includes('/api/locations')) {
        return Promise.resolve(new Response(JSON.stringify([
          { id: "1", name: "Main Hospital", address: "123 Main St" }
        ]), {
          status: 200,
          headers: { 'Content-Type': 'application/json' }
        }));
      }
      if (url.includes('/api/appointments')) {
        return Promise.resolve(new Response(JSON.stringify([]), {
          status: 200,
          headers: { 'Content-Type': 'application/json' }
        }));
      }
      return Promise.resolve(new Response(JSON.stringify([]), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      }));
    });
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