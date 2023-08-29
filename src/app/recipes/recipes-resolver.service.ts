import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Recipe } from "./recipe.model";
import { Observable } from "rxjs";
import { DataStorageService } from "../shared/data-storage.service";
import { RecipeService } from "./recipe.service";

@Injectable({providedIn: 'root'}) // siempre poner providedIn
export class RecipeResolverService implements Resolve<Recipe[]>{

    constructor(private dataStorage: DataStorageService, private recipeService: RecipeService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Recipe[] | Observable<Recipe[]> | Promise<Recipe[]> {
        const recipes = this.recipeService.getRecipes();

        if(recipes.length === 0) {
            return this.dataStorage.fetchRecipe();// no pusimos un subscribe porque el resolver lo hace por nosostros // le damos click en fetch data en el header elegimos una receta y luego le damos recargar da error esto trata de evitarlo // para que siempre este ahi
        } else {
            return recipes;
        }

    }
}