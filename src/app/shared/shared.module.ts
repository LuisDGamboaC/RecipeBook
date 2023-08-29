import { NgModule } from "@angular/core";
import { AlertComponent } from "./alert/alert.component";
import { LoadingSpinnerComponent } from "./loadingSpinner/loading-spinner.component";
import { PlaceHolderDirective } from "./placeholder/placeholder.directive";
import { DropDownDirective } from "./dropdown.directive";
import { CommonModule } from "@angular/common";

@NgModule({
    declarations: [
        AlertComponent,
        LoadingSpinnerComponent,
        PlaceHolderDirective,
        DropDownDirective
    ],
    imports: [
        CommonModule
    ],
    exports: [// para compartir con otros modules
        AlertComponent,
        LoadingSpinnerComponent,
        PlaceHolderDirective,
        DropDownDirective,
        CommonModule
    ]
})
export class SharedModule {}