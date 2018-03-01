import { NgModule } from '@angular/core';
import {
  MatSlideToggleModule,
  MatProgressBarModule,
  MatFormFieldModule,
  MatExpansionModule,
  MatCheckboxModule,
  MatTooltipModule,
  MatToolbarModule,
  MatSidenavModule,
  MatSelectModule,
  MatButtonModule,
  MatDialogModule,
  MatRadioModule,
  MatInputModule,
  MatChipsModule,
  MatCardModule,
  MatMenuModule,
  MatTabsModule,
  MatIconModule,
  MatListModule,
} from '@angular/material';

const MatModules = [

  // display
  MatExpansionModule,
  MatDialogModule,
  MatCardModule,

  // navigation
  MatToolbarModule,
  MatSidenavModule,
  MatMenuModule,
  MatTabsModule,

  // form
  MatSlideToggleModule,
  MatFormFieldModule,
  MatCheckboxModule,
  MatButtonModule,
  MatSelectModule,
  MatInputModule,
  MatRadioModule,
  MatListModule,

  // extras
  MatProgressBarModule,
  MatTooltipModule,
  MatChipsModule,
  MatIconModule,
];

@NgModule({
  imports: MatModules,
  exports: MatModules
})
export class MaterialModule {}



// MatAutocompleteModule,
// MatButtonModule,
// MatButtonToggleModule,
// MatCardModule,
// MatCheckboxModule,
// MatChipsModule,
// MatDatepickerModule,
// MatDialogModule,
// MatDividerModule,
// MatExpansionModule,
// MatGridListModule,
// MatIconModule,
// MatInputModule,
// MatListModule,
// MatMenuModule,
// MatNativeDateModule,
// MatPaginatorModule,
// MatProgressBarModule,
// MatProgressSpinnerModule,
// MatRadioModule,
// MatRippleModule,
// MatSelectModule,
// MatSidenavModule,
// MatSliderModule,
// MatSlideToggleModule,
// MatSnackBarModule,
// MatSortModule,
// MatStepperModule,
// MatTableModule,
// MatTabsModule,
// MatToolbarModule,
// MatTooltipModule,
