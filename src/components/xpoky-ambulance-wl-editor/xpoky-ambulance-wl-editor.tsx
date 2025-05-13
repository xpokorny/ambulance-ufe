import { Component, Event, EventEmitter, Host, Prop, State, h } from '@stencil/core';
import { AppointmentsApi, Appointment, Configuration, User, Location, UsersApi, LocationsApi, UserRoleEnum } from '../../api/ambulance-wl';

@Component({
  tag: 'xpoky-ambulance-wl-editor',
  styleUrl: 'xpoky-ambulance-wl-editor.css',
  shadow: true,
})
export class XpokyAmbulanceWlEditor {
  @Event({ eventName: "editor-closed"}) editorClosed: EventEmitter<string>;
  @Prop() apiBase: string;
  @Prop() appointmentId: string;
  @Prop() loggedUserId: string;
  @Prop() loggedUserName: string;
  @Prop() loggedUserRole: string;
  @State() errorMessage: string;
  @State() appointment: Appointment;
  @State() doctors: User[] = [];
  @State() locations: Location[] = [];
  @State() patients: User[] = [];
  @State() formIsValid: boolean = false;

  async componentWillLoad() {
    if (this.appointmentId === "@new") {
      this.appointment = {
        id: "@new",
        patient: { id: this.loggedUserId, name: this.loggedUserName, role: this.loggedUserRole as UserRoleEnum },
        doctor: { id: "", name: "", role: "doctor" as UserRoleEnum },
        location: { id: "", name: "", address: "" },
        dateTime: new Date(),
        createdBy: { id: this.loggedUserId, name: this.loggedUserName, role: this.loggedUserRole as UserRoleEnum }
      };
    } else {
      await this.getAppointmentAsync();
    }
    await this.getDoctorsAsync();
    await this.getLocationsAsync();
    await this.getPatientsAsync();
  }

  private async getAppointmentAsync(): Promise<Appointment> {
    if (this.appointmentId === "@new") {
      return this.appointment;
    }
    try {
      const configuration = new Configuration({
        basePath: this.apiBase,
      });

      const appointmentsApi = new AppointmentsApi(configuration);
      const response = await appointmentsApi.getAppointmentRaw({
        appointmentId: this.appointmentId
      });

      if (response.raw.status < 299) {
        this.appointment = await response.value();
      } else {
        this.errorMessage = `Cannot retrieve appointment: ${response.raw.statusText}`;
      }
    } catch (err: any) {
      this.errorMessage = `Cannot retrieve appointment: ${err.message || "unknown"}`;
    }
    return this.appointment;
  }

  private async getDoctorsAsync(): Promise<User[]> {
    try {
      const configuration = new Configuration({
        basePath: this.apiBase,
      });

      const usersApi = new UsersApi(configuration);
      const response = await usersApi.getUsersRaw({
        role: "doctor"
      });

      if (response.raw.status < 299) {
        this.doctors = await response.value();
      } else {
        this.errorMessage = `Cannot retrieve doctors: ${response.raw.statusText}`;
      }
    } catch (err: any) {
      this.errorMessage = `Cannot retrieve doctors: ${err.message || "unknown"}`;
    }
    return [];
  }

  private async getLocationsAsync(): Promise<Location[]> {
    try {
      const configuration = new Configuration({
        basePath: this.apiBase,
      });

      const locationsApi = new LocationsApi(configuration);
      const response = await locationsApi.getLocationsRaw();

      if (response.raw.status < 299) {
        this.locations = await response.value();
      } else {
        this.errorMessage = `Cannot retrieve locations: ${response.raw.statusText}`;
      }
    } catch (err: any) {
      this.errorMessage = `Cannot retrieve locations: ${err.message || "unknown"}`;
    }
    return [];
  }

  private async getPatientsAsync(): Promise<User[]> {
    try {
      const configuration = new Configuration({
        basePath: this.apiBase,
      });

      const usersApi = new UsersApi(configuration);
      const response = await usersApi.getUsersRaw({
        role: "patient"
      });

      if (response.raw.status < 299) {
        this.patients = await response.value();
      } else {
        this.errorMessage = `Cannot retrieve patients: ${response.raw.statusText}`;
      }
    } catch (err: any) {
      this.errorMessage = `Cannot retrieve patients: ${err.message || "unknown"}`;
    }
    return [];
  }

  private async updateAppointment() {
    try {
      const configuration = new Configuration({
        basePath: this.apiBase,
      });

      const appointmentsApi = new AppointmentsApi(configuration);
      const response = await appointmentsApi.updateAppointmentRaw({
        appointmentId: this.appointment.id,
        appointment: this.appointment
      });

      if (response.raw.status < 299) {
        this.editorClosed.emit("update");
      } else {
        this.errorMessage = `Cannot update appointment: ${response.raw.statusText}`;
      }
    } catch (err: any) {
      this.errorMessage = `Cannot update appointment: ${err.message || "unknown"}`;
    }
  }

  private async createAppointment() {
    try {
      const configuration = new Configuration({
        basePath: this.apiBase,
      });

      const appointmentsApi = new AppointmentsApi(configuration);
      const response = await appointmentsApi.createAppointmentRaw({
        appointment: this.appointment
      });

      if (response.raw.status < 299) {
        this.editorClosed.emit("create");
      } else {
        this.errorMessage = `Cannot create appointment: ${response.raw.statusText}`;
      }
    } catch (err: any) {
      this.errorMessage = `Cannot create appointment: ${err.message || "unknown"}`;
    }
  }

  private async deleteAppointment() {
    try {
      const configuration = new Configuration({
        basePath: this.apiBase,
      });

      const appointmentsApi = new AppointmentsApi(configuration);
      const response = await appointmentsApi.deleteAppointmentRaw({
        appointmentId: this.appointment.id
      });

      if (response.raw.status < 299) {
        this.editorClosed.emit("delete");
      } else {
        this.errorMessage = `Cannot delete appointment: ${response.raw.statusText}`;
      }
    } catch (err: any) {
      this.errorMessage = `Cannot delete appointment: ${err.message || "unknown"}`;
    }
  }

  private checkFormValidity(): boolean {
    if (!this.appointment) {
      return false;
    }
    
    const hasValidPatient = this.appointment.patient?.id && this.appointment.patient?.id !== "";
    const hasValidDoctor = this.appointment.doctor?.id && this.appointment.doctor?.id !== "";
    const hasValidLocation = this.appointment.location?.id && this.appointment.location?.id !== "";
    const hasValidDateTime = this.appointment.dateTime && !isNaN(new Date(this.appointment.dateTime).getTime());
    
    return hasValidPatient && hasValidDoctor && hasValidLocation && hasValidDateTime;
  }

  private updateFormValidity() {
    this.formIsValid = this.checkFormValidity();
  }

  render() {
    if (this.errorMessage) {
      return (
        <Host>
          <div class="error">{this.errorMessage}</div>
        </Host>
      );
    }

    if (!this.appointment) {
      return (
        <Host>
          <div class="loading">Loading...</div>
        </Host>
      );
    }

    return (
      <Host>
        <form>
          <md-filled-select
            label="Patient"
            value={this.appointment?.patient?.id || ""}
            disabled={this.loggedUserRole === "patient"}
            onInput={(ev: Event) => {
              const patientId = (ev.target as HTMLSelectElement).value;
              if (this.appointment && this.loggedUserRole !== "patient") {
                this.appointment.patient = this.doctors.concat(this.patients).find(u => u.id === patientId) || { id: "", name: "", role: "patient" };
                this.updateFormValidity();
              }
            }}>
            <md-icon slot="leading-icon">person</md-icon>
            {this.patients.map(patient => (
              <md-select-option value={patient.id}>
                <div slot="headline">{patient.name}</div>
              </md-select-option>
            ))}
          </md-filled-select>

          <md-filled-select
            label="Doctor"
            value={this.appointment?.doctor?.id || ""}
            onInput={(ev: Event) => {
              const doctorId = (ev.target as HTMLSelectElement).value;
              if (this.appointment) {
                this.appointment.doctor = this.doctors.find(d => d.id === doctorId) || { id: "", name: "", role: "doctor" };
                this.updateFormValidity();
              }
            }}>
            <md-icon slot="leading-icon">medical_services</md-icon>
            {this.doctors.map(doctor => (
              <md-select-option value={doctor.id}>
                <div slot="headline">{doctor.name}</div>
              </md-select-option>
            ))}
          </md-filled-select>

          <md-filled-select
            label="Location"
            value={this.appointment?.location?.id || ""}
            onInput={(ev: Event) => {
              const locationId = (ev.target as HTMLSelectElement).value;
              if (this.appointment) {
                this.appointment.location = this.locations.find(l => l.id === locationId) || { id: "", name: "", address: "" };
                this.updateFormValidity();
              }
            }}>
            <md-icon slot="leading-icon">place</md-icon>
            {this.locations.map(location => (
              <md-select-option value={location.id}>
                <div slot="headline">{location.name} - {location.address}</div>
              </md-select-option>
            ))}
          </md-filled-select>

          <div class="datetime-container">
            <md-filled-text-field
              label="Date"
              type="date"
              value={this.appointment?.dateTime ? new Date(this.appointment.dateTime).toISOString().split('T')[0] : ""}
              onInput={(ev: Event) => {
                if (this.appointment) {
                  const currentDate = this.appointment.dateTime ? new Date(this.appointment.dateTime) : new Date();
                  const newDate = new Date((ev.target as HTMLInputElement).value);
                  currentDate.setFullYear(newDate.getFullYear(), newDate.getMonth(), newDate.getDate());
                  this.appointment.dateTime = currentDate;
                  this.updateFormValidity();
                }
              }}>
              <md-icon slot="leading-icon">calendar_today</md-icon>
            </md-filled-text-field>

            <md-filled-text-field
              label="Time"
              type="time"
              value={this.appointment?.dateTime ? new Date(this.appointment.dateTime).toTimeString().slice(0, 5) : ""}
              onInput={(ev: Event) => {
                if (this.appointment) {
                  const currentDate = this.appointment.dateTime ? new Date(this.appointment.dateTime) : new Date();
                  const [hours, minutes] = (ev.target as HTMLInputElement).value.split(':');
                  currentDate.setHours(parseInt(hours), parseInt(minutes));
                  this.appointment.dateTime = currentDate;
                  this.updateFormValidity();
                }
              }}>
              <md-icon slot="leading-icon">schedule</md-icon>
            </md-filled-text-field>
          </div>

          <div class="actions">
            <md-filled-button
              disabled={!this.formIsValid}
              onClick={(e: Event) => {
                e.preventDefault();
                this.appointmentId === "@new" ? this.createAppointment() : this.updateAppointment();
              }}>
              {this.appointmentId === "@new" ? "Create" : "Update"}
            </md-filled-button>

            {this.appointmentId !== "@new" && (
              <md-filled-tonal-button
                onClick={(e: Event) => {
                  e.preventDefault();
                  this.deleteAppointment();
                }}>
                Delete
              </md-filled-tonal-button>
            )}

            <md-outlined-button
              onClick={(e: Event) => {
                e.preventDefault();
                this.editorClosed.emit("cancel");
              }}>
              Cancel
            </md-outlined-button>
          </div>
        </form>
      </Host>
    );
  }
}
