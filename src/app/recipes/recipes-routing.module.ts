import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "../auth/auth.guard";
import { RecipeDetailComponent } from "./recipe-detail/recipe-detail.component";
import { RecipeStarComponent } from "./recipe-star/recipe-star.component";
import { RecipesEditComponent } from "./recipes-edit/recipes-edit.component";
import { RecipeResolverService } from "./recipes-resolver.service";
import { RecipesComponent } from "./recipes.component";

const routes: Routes = [
    {
        path: '', 
        component: RecipesComponent, 
        canActivate: [AuthGuard], 
        children: [
        { path: '', component: RecipeStarComponent },
        { path: 'new', component:RecipesEditComponent },
        { 
            path: ':id', 
            component: RecipeDetailComponent, 
            resolve: [RecipeResolverService] 
        }, // los : deben ir de ultimo // resolve  // le damos click en fetch data en el header elegimos una receta y luego le damos recargar da error esto trata de evitarlo
        { path: ':id/edit', 
        component:RecipesEditComponent , 
        resolve: [RecipeResolverService] 
        }, // 0/edit
    ] 
    },
];

@NgModule({

    imports: [
        RouterModule.forChild(routes),
    ],
    exports: [RouterModule]
})
export class RecipesRoutingModule {}