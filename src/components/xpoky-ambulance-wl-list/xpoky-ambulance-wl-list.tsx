import { Component, Event, EventEmitter, Host, Prop, State, Watch, h } from '@stencil/core';
import { AppointmentsApi, Appointment, Configuration } from '../../api/ambulance-wl';

@Component({
  tag: 'xpoky-ambulance-wl-list',
  styleUrl: 'xpoky-ambulance-wl-list.css',
  shadow: true,
})
export class XpokyAmbulanceWlList {

  @Event({ eventName: "editor-opened"}) editorOpened: EventEmitter<string>;
  @Prop() apiBase: string;
  @Prop() loggedUserId: string;
  @State() errorMessage: string;
  @State() appointments: Appointment[] = [];

  async componentWillLoad() {
    await this.getAppointmentsAsync();
  }

  @Watch('loggedUserId')
  async onUserChange() {
    await this.getAppointmentsAsync();
  }

  private async getAppointmentsAsync(): Promise<Appointment[]> {
    if (!this.loggedUserId) {
      this.appointments = [];
      this.errorMessage = undefined;
      return [];
    }
    try {
      const configuration = new Configuration({
        basePath: this.apiBase,
      });

      const appointmentsApi = new AppointmentsApi(configuration);
      const response = await appointmentsApi.getAppointmentsRaw({
        userId: this.loggedUserId
      });

      if (response.raw.status < 299) {
        this.appointments = await response.value();
        this.errorMessage = undefined;
      } else {
        this.errorMessage = `Cannot retrieve list of appointments: ${response.raw.statusText}`;
      }
    } catch (err: any) {
      this.errorMessage = `Cannot retrieve list of appointments: ${err.message || "unknown"}`;
    }
    return [];
  }

  private handleEdit(appointmentId: string) {
    this.editorOpened.emit(appointmentId);
  }

  private async handleDelete(appointmentId: string) {
    try {
      const configuration = new Configuration({ basePath: this.apiBase });
      const appointmentsApi = new AppointmentsApi(configuration);
      await appointmentsApi.deleteAppointment({ appointmentId });
      await this.getAppointmentsAsync();
    } catch (err: any) {
      this.errorMessage = `Cannot delete appointment: ${err.message || "unknown"}`;
    }
  }

  render() {
    return (
      <Host>
        {this.errorMessage
          ? <div class="error">{this.errorMessage}</div>
          : <div class="appointments-container">
              <h2>My Appointments</h2>
              <md-list>
                {this.appointments
                  .filter(appointment => appointment.patient.id === this.loggedUserId)
                  .map((appointment) =>
                  <md-list-item>
                    <div slot="headline">{"Patient: " + (appointment.patient?.name || "")}</div>
                    <div slot="supporting-text">{"Doctor: " + (appointment.doctor?.name || "")}</div>
                    <div slot="supporting-text">{"Location: " + (appointment.location?.name || "") + " - " + (appointment.location?.address || "")}</div>
                    <div slot="supporting-text">{"Date: " + (appointment.dateTime ? new Date(appointment.dateTime).toLocaleString() : "")}</div>
                    <md-icon slot="start">person</md-icon>
                    <span slot="end">
                      <md-filled-tonal-button onClick={() => this.handleEdit(appointment.id)}><md-icon>edit</md-icon></md-filled-tonal-button>
                      <md-filled-tonal-button onClick={() => this.handleDelete(appointment.id)}><md-icon>delete</md-icon></md-filled-tonal-button>
                    </span>
                  </md-list-item>
                )}
              </md-list>

              <h2>Created Appointments</h2>
              <md-list>
                {this.appointments
                  .filter(appointment => appointment.createdBy.id === this.loggedUserId)
                  .map((appointment) =>
                  <md-list-item>
                    <div slot="headline">{"Patient: " + (appointment.patient?.name || "")}</div>
                    <div slot="supporting-text">{"Doctor: " + (appointment.doctor?.name || "")}</div>
                    <div slot="supporting-text">{"Location: " + (appointment.location?.name || "") + " - " + (appointment.location?.address || "")}</div>
                    <div slot="supporting-text">{"Date: " + (appointment.dateTime ? new Date(appointment.dateTime).toLocaleString() : "")}</div>
                    <md-icon slot="start">person</md-icon>
                    <span slot="end">
                      <md-filled-tonal-button onClick={() => this.handleEdit(appointment.id)}><md-icon>edit</md-icon></md-filled-tonal-button>
                      <md-filled-tonal-button onClick={() => this.handleDelete(appointment.id)}><md-icon>delete</md-icon></md-filled-tonal-button>
                    </span>
                  </md-list-item>
                )}
              </md-list>
            </div>
        }
        <md-filled-icon-button class="add-button"
          onclick={() => this.editorOpened.emit("@new")}> 
          <md-icon>add</md-icon>
        </md-filled-icon-button>
      </Host>
    );
  }
}
