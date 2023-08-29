import { Ingredient } from "../../shared/ingredient.model";
import * as ShoppListActions from "./shopping-list.actions";

const initialState = {
    ingredients: [ // store lo guarda esto
        new Ingredient('Apples', 5),
        new Ingredient('Tomatoes', 10),
      ],
}

export function shoppingListReducer(state = initialState , action: ShoppListActions.AddIngredient) {
    switch (action.type) {
        // Add ingredients
        case ShoppListActions.ADD_INGREDIENT: // nunca modificar el state
            return { 
                ...state, // copia delold state // buena practica
                ingredients: [...state.ingredients, action.type]
            }
    }
}