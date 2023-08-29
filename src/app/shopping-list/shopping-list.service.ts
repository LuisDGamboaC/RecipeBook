// import { EventEmitter } from "@angular/core";
import { Ingredient } from "../shared/ingredient.model";
import { Subject } from "rxjs";

export class ShoppingList {
    ingredientsChanged = new Subject<Ingredient[]>(); // emitira un array de ingredientes
    startedEditing = new Subject<number>();
    private ingredients: Ingredient[] = [
        new Ingredient('Apples', 5),
        new Ingredient('Tomatos', 6),
      ];

    getIngredients() {
        return this.ingredients.slice(); // copia del array pero no se actualiza para q se actualize podemos borrar splice
    }

    getIngredient(index: number) {
        return this.ingredients[index];
    }

    addIngredient(ingredient: Ingredient) {
        this.ingredients.push(ingredient);
        this.ingredientsChanged.next(this.ingredients.slice()); // copia actualizada con los cambios
    }

    addIngredients(ingredients: Ingredient[]) { // OBTNEMOS NUESTRA LISTA de ingredietes
        // for (let ingredient of ingredients) {
        //     this.addIngredient(ingredient);
        // }
        this.ingredients.push(...ingredients); // convertiremos un array de elementos en un lista de elementos, con los tres puntos podemos esparcir nuestros ingredientes  ahcia un lista de ingredientes individuales que son empujados sinproblemas a nuestro array de ingredientes
        this.ingredientsChanged.next(this.ingredients.slice());
    }

    updateIngredient(index: number, newIngredient: Ingredient) {
        this.ingredients[index] = newIngredient;
        this.ingredientsChanged.next(this.ingredients.slice());
    }

    deleteIngredient(index: number) {
        this.ingredients.splice(index, 1);// splice nos deja empezar a un punto en especifico es este caso en la posicion 1 y lo removemos
        this.ingredientsChanged.next(this.ingredients.slice());
    }
}