import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

import { OidcSecurityService } from 'angular-auth-oidc-client';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = '';
  userData$: Observable<any>;
  isAuthenticated = false;

  constructor(private http: HttpClient, private oidcSecurityService: OidcSecurityService) {
    console.log('AppComponent STARTING');
  }

  ngOnInit(): void {
    this.userData$ = this.oidcSecurityService.userData$;

    this.oidcSecurityService.checkAuthIncludingServer().subscribe((response) => {
      console.log('app authenticated', response);
    });
  }

  login(): void {
    console.log('start login');

    // let formData: FormData = new FormData();
    // formData.append("Email", "a@flatt.pl");
    // formData.append("Password", "Flatt200");

    const headers = { 'content-type': 'application/json' }
    const body = JSON.stringify({ Email: "ania1975a@mailinator.com", "Password": "Flatt200!" });
    console.log(body)
    // return this.http.post(this.baseURL + 'people', body,{'headers':headers})

    this.http.post("https://localhost:44397/Account/Login", body, { 'headers': headers, withCredentials: true }).subscribe((response) => {
      // this.http.post("https://localhost:44395/Account/LogOff", {}).subscribe(() => {
      //     console.log("logged off");
      // });
      this.isAuthenticated = true;
      console.log('response');
      console.log(response);
      // console.log('Before authorize');
      this.oidcSecurityService.authorize();
    });


    // this.oidcSecurityService.authorize();
  }

  //   login(): void {
  //     console.log('start login');

  //     let formData: FormData = new FormData(); 
  //     formData.append("Email", "pjoter.flatt@gmail.com"); 
  //     formData.append("Password", "zaq1@WSX");

  //     this.http.post("https://localhost:44397/Account/Login", formData, { withCredentials: true }).subscribe(() => {
  //         // this.http.post("https://localhost:44395/Account/LogOff", {}).subscribe(() => {
  //         //     console.log("logged off");
  //         // });
  //         this.oidcSecurityService.authorize();
  //     });
  //     // this.oidcSecurityService.authorize();
  // }

  getToken() {
    // const headers = { 'content-type': 'application/x-www-form-urlencoded' };

    // var payload = {
    //   grant_type: "authorization_code",
    //   client_id: "communittiesAngularClient",
    //   code_verifier: "4a5fa3bedbfdc87c7149315895b75334db5bf622d1334d7f95762cfb6fccyBJT1hS",
    //   code: "encMKJQrpTYQMU7SScZKy_u0oTrVXe6Joy61XoXgb90",
    //   redirect_uri: "http://localhost:4200"
    // };
    // this.http.post("https://localhost:44397/connect/token", "grant_type=authorization_code&client_id=communittiesAngularClient&code_verifier=1a9551cd21001e3fe9dc2927c909becc7bcb447a38f5b0108b2bffeb2b80mTvJ10G&code=u2F-mvR__R5xVS-q_fUDBw8FMApzhuzWXPQo6XpVS3w&redirect_uri=http%3A%2F%2Flocalhost%3A4200", 
    // { 'headers': headers, withCredentials: true })
    // .subscribe(resp =>{
    //   console.log(resp);
    // });

    this.oidcSecurityService.getAccessToken('0-communittiesAngularClient').subscribe(at => { console.log(at) });
  }

  refreshSession(): void {
    console.log('start refreshSession');
    this.oidcSecurityService.authorize();
  }

  logoffAndRevokeTokens(): void {
    this.oidcSecurityService.logoffAndRevokeTokens().subscribe((result) => console.log(result));
  }

  revokeRefreshToken(): void {
    this.oidcSecurityService.revokeRefreshToken().subscribe((result) => console.log(result));
  }

  revokeAccessToken(): void {
    this.oidcSecurityService.revokeAccessToken().subscribe((result) => console.log(result));
  }
}
