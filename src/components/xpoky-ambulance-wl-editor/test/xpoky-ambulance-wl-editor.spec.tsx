import { newSpecPage } from '@stencil/core/testing';
import { XpokyAmbulanceWlEditor } from '../xpoky-ambulance-wl-editor';
import fetchMock from 'jest-fetch-mock';

describe('xpoky-ambulance-wl-editor', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
    fetchMock.mockResponseOnce(JSON.stringify([]));
  });

  it('renders', async () => {
    const page = await newSpecPage({
      components: [XpokyAmbulanceWlEditor],
      html: `<xpoky-ambulance-wl-editor api-base="http://localhost/api"></xpoky-ambulance-wl-editor>`,
    });
    await page.waitForChanges();
    expect(page.root).toBeTruthy();
  });

  it('renders with error message', async () => {
    const page = await newSpecPage({
      components: [XpokyAmbulanceWlEditor],
      html: `<xpoky-ambulance-wl-editor api-base="http://localhost/api"></xpoky-ambulance-wl-editor>`,
    });
    const editor = page.rootInstance as XpokyAmbulanceWlEditor;
    editor.errorMessage = "Test error message";
    await page.waitForChanges();
    expect(page.root).toBeTruthy();
  });

  it('renders with appointment data', async () => {
    const page = await newSpecPage({
      components: [XpokyAmbulanceWlEditor],
      html: `<xpoky-ambulance-wl-editor api-base="http://localhost/api"></xpoky-ambulance-wl-editor>`,
    });
    const editor = page.rootInstance as XpokyAmbulanceWlEditor;
    editor.appointment = null;
    await page.waitForChanges();
    expect(page.root).toBeTruthy();
  });
});