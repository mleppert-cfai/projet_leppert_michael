import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Select, Store } from "@ngxs/store";
import { of } from "rxjs";
import { Observable } from "rxjs/internal/Observable";
import { tap } from "rxjs/operators";
import { AddJwtToken } from "shared/actions/client-action";
import { ClientState } from "shared/states/client-state";
import { ClientStateModel } from "shared/states/client-state-model";

@Injectable()
export class ApiHttpInterceptor implements HttpInterceptor
{
jwtToken : String = "";
constructor(private store : Store) { }
intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    /*if (this.jwtToken != "") {
        req = req.clone({ setHeaders: { Authorization: `Bearer ${this.jwtToken}` }});
    }*/
    let jwt : String = "";
    jwt = this.store.selectSnapshot(ClientState.getJwtToken)
    if (jwt != "") {
        req = req.clone({ setHeaders: { Authorization: `Bearer ${jwt}` }});
    }

    return next.handle(req).pipe(tap(
    (evt : HttpEvent<any>) => {
        if (evt instanceof HttpResponse) {
            let tab : Array<String> ;
            let enteteAuthorization =
            evt.headers.get("Authorization");
            if (enteteAuthorization != null ) {
                tab = enteteAuthorization.split(/Bearer\s+(.*)$/i);
                if (tab.length > 1) {
                    //this.jwtToken = tab [1];
                    //console.log(jwt);
                    //console.log(tab[1]);
                    this.store.dispatch(new AddJwtToken(tab[1]));
                }
            }
        }
    },
    (error: HttpErrorResponse) => {
        switch(error.status){
            case 400:
            case 401:
        }
        return of(null);
        }
    ));
    }
}