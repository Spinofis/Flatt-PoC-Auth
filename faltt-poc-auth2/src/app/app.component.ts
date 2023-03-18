import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

import { AuthConfig } from 'angular-oauth2-oidc';
import { OAuthService, OAuthEvent } from 'angular-oauth2-oidc';
import { filter } from 'rxjs';

export const authCodeFlowConfig: AuthConfig = {
  // Url of the Identity Provider
  issuer: 'https://localhost:44397/',

  // URL of the SPA to redirect the user to after login
  redirectUri: window.location.origin,

  // The SPA's id. The SPA is registerd with this id at the auth-server
  // clientId: 'server.code',
  clientId: 'communittiesAngularClient',

  // Just needed if your auth server demands a secret. In general, this
  // is a sign that the auth server is not configured with SPAs in mind
  // and it might not enforce further best practices vital for security
  // such applications.
  // dummyClientSecret: 'secret',

  responseType: 'code',

  // set the scope for the permissions the client should request
  // The first four are defined by OIDC.
  // Important: Request offline_access to get a refresh token
  // The api scope is a usecase specific one
  scope: 'openid profile email offline_access',

  showDebugInformation: true,
};


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'faltt-poc-auth2';

  constructor(private http: HttpClient, private oauthService: OAuthService) {
    console.log('AppComponent STARTING');
  }

  login(): void {
    this.oauthService.configure(authCodeFlowConfig);
    this.oauthService.loadDiscoveryDocumentAndTryLogin();
    console.log('start login');

    this.oauthService.events.subscribe(event => console.log(event));

    // let formData: FormData = new FormData();
    // formData.append("Email", "a@flatt.pl");
    // formData.append("Password", "Flatt200");

    const headers = { 'content-type': 'application/json' }
    const body = JSON.stringify({ Email: "ania1975a@mailinator.com", "Password": "Flatt200!" });
    console.log(body)
    // return this.http.post(this.baseURL + 'people', body,{'headers':headers})

    this.http.post("https://localhost:44397/Account/Login", body, { 'headers': headers, withCredentials: false }).subscribe((response) => {
      // this.http.post("https://localhost:44395/Account/LogOff", {}).subscribe(() => {
      //     console.log("logged off");
      // });
      console.log('response');
      console.log(response);
      // console.log('Before authorize');
      this.oauthService.initCodeFlow();
    });
    // this.oauthService.initCodeFlow();
    // this.oidcSecurityService.authorize();
  }

  getToken() {
    console.log(this.oauthService.hasValidAccessToken());
  }
}
