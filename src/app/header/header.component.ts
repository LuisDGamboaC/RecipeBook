import { Component, OnDestroy, OnInit } from "@angular/core";
import { DataStorageService } from "../shared/data-storage.service";
import { AuthService } from "../auth/auth.service";
import { Subscription } from "rxjs";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
})

export class HeaderComponent implements OnInit, OnDestroy {
    collapsed = true;
    private userSub: Subscription;
    isAuthenticated = false; // no se muestra la opcion si receppies si no esta autenticado

    constructor(private dataStorageService: DataStorageService, private authService: AuthService) {}
    // @Output() featureSelected = new EventEmitter<string>();

    // onSelect(feature: string) {
    //     this.featureSelected.emit(feature);
    // }

    ngOnInit(): void {
        this.userSub =  this.authService.users.subscribe(user => { // mostrara si el susario esta autenticado
            this.isAuthenticated = !!user; //!user ? false : true; Lo mismo
            // console.log(!user); true
            // console.log(!!user); false
        });
    }

    onSaveData() {
        this.dataStorageService.storeRecipes();
    }

    onFetchData(){
        this.dataStorageService.fetchRecipe().subscribe();
    }

    onLogout() {
        this.authService.logout();
    }

    ngOnDestroy(): void {
        this.userSub.unsubscribe();
    }
}