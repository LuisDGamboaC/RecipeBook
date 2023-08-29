import { Injectable } from "@angular/core";
import { Recipe } from "./recipe.model";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingList } from "../shopping-list/shopping-list.service";
import { Subject } from "rxjs";

@Injectable()

export class RecipeService {

    recipesChanged = new Subject<Recipe[]>(); // un array de recipe.models.ts

    recipeSelected = new Subject<Recipe>(); // Recipe viene de recipe.models.ts

    private recipes: Recipe[] = [];
        // new Recipe('Test recipe', 
        // 'Lassagna', 
        // 'https://hips.hearstapps.com/hmg-prod/images/easy-dinner-recipes-1676057761.jpeg?crop=1.00xw:1.00xh;0,0&resize=980:*', 
        // [
        //     new Ingredient('Meat', 1),
        //     new Ingredient('Cheese', 3)
        // ]),
        // new Recipe('Test recipe 2', 
        // 'Pizza', 
        // 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Pizza-3007395.jpg/800px-Pizza-3007395.jpg', 
        // [   
        //     new Ingredient('Tomate', 1),
        //     new Ingredient('Cheese', 3),
        //     new Ingredient('Dough', 4),

        // ])
    

    constructor(private slService: ShoppingList){}

    //overWrite el aray de recipes
    setRecipes(recipese: Recipe[]) {
        this.recipes = recipese;
        this.recipesChanged.next(this.recipes.slice());
    }

    getRecipes() {
        return this.recipes.slice(); // slice regresa un nuevo array  el cual es una copia del array de arriba 
    }

    getRecipe(index: number) { // metodo id
        return this.recipes[index];
    }

    addIngredientsToShoppingList(ingredients: Ingredient[]) {
        this.slService.addIngredients(ingredients);
    }

    addRecipe(recipe: Recipe) {
        this.recipes.push(recipe);
        this.recipesChanged.next(this.recipes.slice());
    }

    updateRecipe(index: number, newRecipe: Recipe) {
        this.recipes[index] = newRecipe;
        this.recipesChanged.next(this.recipes.slice());
    }   

    deleteRecipe(index: number) {
        this.recipes.splice(index, 1);
        this.recipesChanged.next(this.recipes.slice());
    }
}