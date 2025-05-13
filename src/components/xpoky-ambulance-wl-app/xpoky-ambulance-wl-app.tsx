import { Component, Host, Prop, State, h } from '@stencil/core';
import { UsersApi, User, Configuration } from '../../api/ambulance-wl';

declare global {
  interface Window { navigation: any; }
}

@Component({
  tag: 'xpoky-ambulance-wl-app',
  styleUrl: 'xpoky-ambulance-wl-app.css',
  shadow: true,
})
export class XpokyAmbulanceWlApp {
  @State() private relativePath = "";
  @Prop() basePath: string="";
  @State() users: User[] = [];
  @State() loggedUserId: string = '';
  @State() loggedUserRole: string = '';
  @State() loggedUserName: string = '';
  @Prop() apiBase: string;
  
  async componentWillLoad() {
    const baseUri = new URL(this.basePath, document.baseURI || "/").pathname;

    const toRelative = (path: string) => {
      if (path.startsWith( baseUri)) {
        this.relativePath = path.slice(baseUri.length)
      } else {
        this.relativePath = ""
      }
    }

    window.navigation?.addEventListener("navigate", (ev: Event) => {
      if ((ev as any).canIntercept) { (ev as any).intercept(); }
      let path = new URL((ev as any).destination.url).pathname;
      toRelative(path);
    });

    toRelative(location.pathname)

    const configuration = new Configuration({ basePath: this.apiBase });
    const usersApi = new UsersApi(configuration);
    this.users = await usersApi.getUsers({});
    if (this.users.length > 0) {
      this.setLoggedUser(this.users[0].id);
    }
  }
  
  render() {
    let element = "list"
    let appointmentId = "@new"

    if ( this.relativePath.startsWith("entry/"))
    {
      element = "editor";
      appointmentId = this.relativePath.split("/")[1]
    }

    const navigate = (path:string) => {
      const absolute = new URL(path, new URL(this.basePath, document.baseURI)).pathname;
      window.navigation.navigate(absolute)
    }

    return (
      <Host>
        <header>
          <md-filled-select label="Logged User" oninput={(ev: InputEvent) => this.handleUserChange(ev)}>
            <md-icon slot="leading-icon">person</md-icon>
            {this.users.map(user => (
              <md-select-option value={user.id} selected={this.loggedUserId === user.id}>
                <div slot="headline">{user.name} ({user.role})</div>
              </md-select-option>
            ))}
          </md-filled-select>
        </header>

        { element === "editor"
        ? <xpoky-ambulance-wl-editor 
            api-base={this.apiBase} appointment-id={appointmentId}
            logged-user-id={this.loggedUserId} logged-user-name={this.loggedUserName} logged-user-role={this.loggedUserRole}
            oneditor-closed={ () => navigate("./list")} >
          </xpoky-ambulance-wl-editor>
        : <xpoky-ambulance-wl-list
            api-base={this.apiBase} logged-user-id={this.loggedUserId}
            oneditor-opened={ (ev: CustomEvent<string>)=> navigate("./entry/" + ev.detail) } >
          </xpoky-ambulance-wl-list>
        }

      </Host>
    );
  }

  private handleUserChange(ev: InputEvent) {
    const userId = (ev.target as HTMLSelectElement).value;
    this.setLoggedUser(userId);
  }

  private setLoggedUser(userId: string) {
    const user = this.users.find(u => u.id === userId);
    if (user) {
      this.loggedUserId = user.id;
      this.loggedUserRole = user.role;
      this.loggedUserName = user.name;
    }
  }
}
