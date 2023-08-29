import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { AuthInterceptorService } from "./auth/auth-interceptor.service";
import { RecipeService } from "./recipes/recipe.service";
import { ShoppingList } from "./shopping-list/shopping-list.service";

@NgModule({
    providers: [
        ShoppingList, 
        RecipeService,  // recipeService no se borrara siempre correra
        {
          provide: HTTP_INTERCEPTORS, 
          useClass: AuthInterceptorService, 
          multi: true
        }
    ]
})
export class coreModule {}