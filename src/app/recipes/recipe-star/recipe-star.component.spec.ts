import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeStarComponent } from './recipe-star.component';

describe('RecipeStarComponent', () => {
  let component: RecipeStarComponent;
  let fixture: ComponentFixture<RecipeStarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RecipeStarComponent]
    });
    fixture = TestBed.createComponent(RecipeStarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
