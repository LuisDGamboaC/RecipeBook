import { Component, ComponentFactoryResolver, OnDestroy, ViewChild, ViewContainerRef } from "@angular/core";
import { NgForm } from "@angular/forms";
import { AuthService, AuthResponseData } from "./auth.service";
import { Observable, Subscription } from "rxjs";
import { Router } from "@angular/router";
import { AlertComponent } from "../shared/alert/alert.component";
import { PlaceHolderDirective } from "../shared/placeholder/placeholder.directive";

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html'
})
export class AuthComponent implements OnDestroy {
    isLoginMode = true;
    isLoading = false; // muestra el simbolo de cargar
    error: string = null; // tengo mensjae o no tengo un mensaje
    @ViewChild(PlaceHolderDirective, {static: false}) alertHost: PlaceHolderDirective;

    private closeSub: Subscription;

    constructor(private authService: AuthService, private router: Router, private componentFactoryRes: ComponentFactoryResolver) {} 

    onSwithMode() {
        this.isLoginMode = !this.isLoginMode; // false
    }

    onSubmit(form: NgForm) {
        if (!form.valid) {
            return; // seguridad extra
        }
        const email = form.value.email;
        const password = form.value.password;

        let authObs: Observable<AuthResponseData>

        this.isLoading = true;

        if(this.isLoginMode) {
            authObs = this.authService.login(email, password)
            
        }else {
           authObs = this.authService.signUp(email, password)
            
        }
        authObs.subscribe({next:(restData) => {
            console.log(restData);
            this.isLoading = false;
            this.router.navigate(['/recipes']);
        }, 
        error: (errorMessage) => { // cuando recibimos un error
            console.log(errorMessage);
            this.error = errorMessage;
            this.showErrorAlert(errorMessage);
            this.isLoading = false;
        }
    }); 
        form.reset();
    }

    onHandleError() { // Dynamic response
        this.error = null;
    }

    private showErrorAlert(message: string) { // creamos dynamicamente nuestro componente // creamos nuestro propio ngif // USAR NG IF ES MAS FACIL
        const alertComponentFact = this.componentFactoryRes.resolveComponentFactory(AlertComponent);
        const hostViewContanierRef = this.alertHost.viewContainerRef;
        hostViewContanierRef.clear();

        const componentRef = hostViewContanierRef.createComponent(alertComponentFact);

        componentRef.instance.message = message; // mostara el mensaje de error de alert.ts

        // close tiene ouptup y subscribe no pueden estar juntos pero esta s una de las pocas exepcines
        this.closeSub = componentRef.instance.close.subscribe(() =>{
            this.closeSub.unsubscribe();
            hostViewContanierRef.clear(); // cerramos el maensaje de password incorrecto si damos click en close o afuera
        }); 
    }

    ngOnDestroy(): void {
        if(this.closeSub) {
            this.closeSub.unsubscribe();
        }
    }
}