import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

import { OidcClientNotification, OidcSecurityService, OpenIdConfiguration, UserDataResult } from 'angular-auth-oidc-client';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  // configuration$: Observable<OpenIdConfiguration>;
  // userDataChanged$: Observable<OidcClientNotification<any>>;
  // userData$: Observable<UserDataResult>;
  isAuthenticated = false;
  // checkSessionChanged$: Observable<boolean>;
  // checkSessionChanged: any;

  constructor(public oidcSecurityService: OidcSecurityService, private http: HttpClient) { }
  ngOnInit() {
    // this.configuration$ = this.oidcSecurityService.getConfiguration();
    // this.userData$ = this.oidcSecurityService.userData$;
    // this.checkSessionChanged$ = this.oidcSecurityService.checkSessionChanged$;

    this.oidcSecurityService.checkAuthIncludingServer().subscribe((response) => {
      console.log('app authenticated', response);
    });
  }
  login() {
    console.log('start login');

    const headers = { 'content-type': 'application/json' }
    const body = JSON.stringify({ Email: "ania1975a@mailinator.com", "Password": "Flatt200!" });
    console.log(body)


    this.http.post("https://localhost:44397/Account/Login", body, { 'headers': headers, withCredentials: true }).subscribe((response) => {
      this.isAuthenticated = true;
      console.log('response');
      console.log(response);

      this.oidcSecurityService.authorize();
    });
  }

  refreshSessionCheckSession() {
    console.log('start refreshSession');
    this.oidcSecurityService.authorize();
  }

  forceRefreshSession() {
    this.oidcSecurityService.forceRefreshSession().subscribe((result) => console.log(result));
  }

  logout() {
    console.log('start logoff');
    this.oidcSecurityService.logoff().subscribe((result) => console.log(result));
  }

  testRequest() {
    this.http.get("https://localhost:44367/api/lokale").subscribe(resp => console.log(resp));
  }
}
