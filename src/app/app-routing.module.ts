import { NgModule } from "@angular/core";
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
// import { RecipesComponent } from "./recipes/recipes.component";
// import { ShoppingListComponent } from "./shopping-list/shopping-list.component";
// import { AuthComponent } from "./auth/auth.component";

const appRoutes: Routes = [
    {path: '', redirectTo: '/recipes', pathMatch: "full"}, // redirecciona si el full path esta vacio
    {path: 'recipes', 
        loadChildren: () => import('./recipes/recipes.module')
            .then(m => m.RecipesModule)},
    {path: 'shopping-list', loadChildren: () => import('./shopping-list/shopping-list.module').then(m => m.ShoppingListModule)},
    {path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)}
]

@NgModule({
    imports: [RouterModule.forRoot(appRoutes, {preloadingStrategy: PreloadAllModules})],
    exports: [RouterModule] // app.module // imports como AppRoutingModule
})
export class AppRoutingModule {

}