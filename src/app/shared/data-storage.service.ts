import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core"; 
import { exhaustMap, map, take, tap } from "rxjs";

import { RecipeService } from "../recipes/recipe.service";
import { Recipe } from "../recipes/recipe.model";
import { AuthService } from "../auth/auth.service";

@Injectable({providedIn: 'root'})
export class DataStorageService {
    constructor(private http: HttpClient, private recipesService: RecipeService, private authService: AuthService ){}

    storeRecipes() {
        const recipes = this.recipesService.getRecipes();
        this.http
        .put('https://ng-recipebook-ed28e-default-rtdb.firebaseio.com/recipes.json', recipes)
        .subscribe( response => { 
            console.log(response);
        });
    }

    fetchRecipe() { // <>// tenemos que decirle a angular que tipo de respuesta (extracted response body) tendremos que ser un array // model
                 // retun para recipe-resolver header.component
        return this.http
        .get<Recipe[]>(
            'https://ng-recipebook-ed28e-default-rtdb.firebaseio.com/recipes.json'
            )
        .pipe(
        map( recipeses => {
            return recipeses.map(recipe => {
                return {
                    ...recipe, 
                    ingredients: recipe.ingredients ? recipe.ingredients : []
                }; // si no hay ingrediente lo dejamos como un array vacio // proteccion contra errores // por si acasao olivdan poner ingredientes
            });
        }),
        tap(recipes => {
            this.recipesService.setRecipes(recipes);
 // le damos click en fetch data en el header elegimos una receta y luego le damos recargar da error esto trata de evitarlo
            })  
        ); 
    }
}