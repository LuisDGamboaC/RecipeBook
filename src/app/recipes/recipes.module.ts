import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { ReactiveFormsModule } from "@angular/forms";

import { RecipesComponent } from "./recipes.component";
import { RecipeListComponent } from "./recipe-list/recipe-list.component";
import { RecipeDetailComponent } from "./recipe-detail/recipe-detail.component";
import { RecipeItemComponent } from "./recipe-list/recipe-item/recipe-item.component";
import { RecipeStarComponent } from "./recipe-star/recipe-star.component";
import { RecipesEditComponent } from "./recipes-edit/recipes-edit.component";
import { RecipesRoutingModule } from "./recipes-routing.module";
import { SharedModule } from "../shared/shared.module";


@NgModule({
    declarations: [
        RecipesComponent,
        RecipeListComponent,
        RecipeDetailComponent,
        RecipeItemComponent,
        RecipeStarComponent,
        RecipesEditComponent
    ],
    imports: [
        RouterModule, 
        SharedModule, 
        ReactiveFormsModule, 
        RecipesRoutingModule
    ],
})
export class RecipesModule {}