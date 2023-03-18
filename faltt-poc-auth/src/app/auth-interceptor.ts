import { Injectable } from '@angular/core';
import {
    HttpEvent,
    HttpInterceptor,
    HttpHandler,
    HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { OidcSecurityService } from 'angular-auth-oidc-client';
@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private oidcSecurityService: OidcSecurityService) { }

    intercept(
        req: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        debugger;
        let modifiedReq = req;
        let authToken;

        this.oidcSecurityService.getAccessToken()
            .subscribe((token) => {
                authToken = token;
            })

        while (!authToken);

        modifiedReq = req.clone({
            headers: req.headers.set('Authorization', 'Bearer ' + authToken),
        });

        return next.handle(modifiedReq);
    }
}
