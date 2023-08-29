import { Component, Input } from '@angular/core';
import { Recipe } from '../../recipe.model';
// import { RecipeService } from '../../recipe.service';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent {
  @Input('r-item') recipe: Recipe;
  @Input() index: number; // lo unimos recipe-list.html [index]="i" let i = index// [routerlink]="[index]"

  // @Output() recipeSelected = new EventEmitter<void>();

  // constructor(private reciepService: RecipeService){}

  // onSelected() {
  //   this.reciepService.recipeSelected.emit(this.recipe);
  // }

}
