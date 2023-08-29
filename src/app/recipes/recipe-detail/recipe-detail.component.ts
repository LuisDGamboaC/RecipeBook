import { Component, OnInit,  } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit{
  recipe: Recipe;
  id: number;

  constructor( private recipeService: RecipeService, private  route: ActivatedRoute, private router: Router) {}

ngOnInit(): void {
  // const id = +this.route.snapshot.params['id']; // solo muestra la info pero n muestra los cambios // reacionamos a cambios en nuestras recetas id

  this.route.params.subscribe( // paramos observables y nos subscribimos a esos observables y gracias a eso podemos reaccionar a los cambios en nuestro route.params // ahora cargaremos nuestra receta desde nuestro recipe service y para eso cambios nuestros recipe.service
    (params: Params) => {
      this.id = +params['id'];
      this.recipe = this.recipeService.getRecipe(this.id); //manualmente escribir en la url reciep/0
    }
  );
}
  
onAddToShoppingList() {
    this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients);
  }

  onEditRecipe() {
    this.router.navigate(['edit'], {relativeTo: this.route}); // recipe-edit html
    // this.router.navigate(['../', this.id, 'edit'], {relativeTo: this.route}); // recipes/0/edit
  }

  onDelete() {
    this.recipeService.deleteRecipe(this.id);
    this.router.navigate(['/recipes']);
  }

}
