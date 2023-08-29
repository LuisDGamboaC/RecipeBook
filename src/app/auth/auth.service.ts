import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, catchError, tap } from "rxjs";
import { throwError } from "rxjs";
import { User } from "./user.model";
import { Router } from "@angular/router";
import { environment } from "../../environments/environment";

export interface AuthResponseData { //Carga útil de respuesta
    kind: string,
    idToken: string,
    email: string
    refreshToken: string,
    expiresIn:string	
    localId: string
    registered?: boolean;
}

@Injectable({providedIn: 'root'})
export class AuthService {

    users = new BehaviorSubject<User>(null);
    private tokenExpirationTimer: any;
    // token: string = null;

    constructor(private http: HttpClient, private router: Router) {}

    signUp(email: string, password: string) {
         return this.http.post<AuthResponseData>( // para que typescript sepa que cuerpo viene los datos
            'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + environment.fireBaseAPIkey, 
        {
            email: email,
            password: password,
            returnSecureToken: true
        }
        ).pipe(catchError(this.handleError), 
            tap(resData => {
                this.handleAuthentication(
                    resData.email,  // email
                    resData.localId	, // userId
                    resData.idToken, // token
                    +resData.expiresIn // expirationDate
                );
            })
        );
    }

    login(email: string, password: string) {
        return this.http.post<AuthResponseData>(
            'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + environment.fireBaseAPIkey, 
            {
                email: email,
                password: password,
                returnSecureToken: true
            }
            ).pipe(catchError(this.handleError), 
            tap(resData => {
                this.handleAuthentication(
                    resData.email,  // email
                    resData.localId	, // userId
                    resData.idToken, // token
                    +resData.expiresIn // expirationDate
                );
            })
        );
    }

    autoLogin() { // recupera el token que convertivos a string con json.strngify para q no se borre la info cuando recarguemos la pagina
        const userDaTa: {
            email: string,
            id: string,
            _token: string, 
            _tokenExpirationDate: string 
        } = JSON.parse(localStorage.getItem('userDaTa')); // javascript Object
        if(!userDaTa) {
            return;
        }
        const loadedUser = new User(userDaTa.email, userDaTa.id, userDaTa._token, new Date(userDaTa._tokenExpirationDate));

        if(loadedUser.token) { // recupera el token de user-model.ts
            this.users.next(loadedUser);
            const expirationDuration = new Date(userDaTa._tokenExpirationDate).getTime() - new Date().getTime();
            this.autoLogout(expirationDuration);
        }
    }

    logout() {
        this.users.next(null);
        this.router.navigate(['/auth']);
        localStorage.removeItem('userDaTa');
        if(this.tokenExpirationTimer) {
            clearTimeout(this.tokenExpirationTimer); // lo limpiamos
        }
        this.tokenExpirationTimer = null;
    }

    autoLogout(expirationDuration: number) {
        this.tokenExpirationTimer = setTimeout(() => {
            this.logout();
        }, expirationDuration);
    }

    private handleAuthentication(email: string, userId: string, token: string, expiresIn: number) {
        const expirationDate = new Date(new Date().getTime() + +expiresIn * 1000);
        const user = new User(
            email, 
            userId, 
            token, 
            expirationDate 
            );
            this.users.next(user);
            this.autoLogout(expiresIn * 1000);
            localStorage.setItem('userDaTa', JSON.stringify(user)); // se almacena el texto en el local storage // claveDaTa es un key
    }

    private handleError(errorRes: HttpErrorResponse) { // Muestra los errores como password incorreto
        
        let errorMessage = 'An unknow error ocurred';

        if(!errorRes.error || !errorRes.error.error){ // ponemos esto en service para poder poner mas ligero el codigo de auth.compoennt.ts
            return throwError(() => errorMessage);
        }
        switch(errorRes.error.error.message) {
            case 'EMAIL_EXISTS':
                errorMessage = 'This Email Exist already';
            break;
            case 'EMAIL_NOT_FOUND':
                errorMessage = 'This Email is Invalid';
            break;
            case 'INVALID_PASSWORD':
                errorMessage = 'Incorrect Password';
            break;
        }
        
        return throwError(() => errorMessage);
    }
}