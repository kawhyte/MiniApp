import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule, MatToolbarModule } from '@angular/material';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatSliderModule} from '@angular/material/slider';

@NgModule({
  imports: [MatButtonModule, MatToolbarModule, MatMenuModule, 
    MatIconModule, MatInputModule, MatCardModule, MatSidenavModule, 
    MatListModule, MatSliderModule],

  exports: [MatButtonModule, MatToolbarModule, MatMenuModule, 
    MatIconModule, MatInputModule, MatCardModule, MatSidenavModule,
     MatListModule, MatSliderModule],
})
export class MaterialModule { }