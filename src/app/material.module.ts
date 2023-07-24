import { NgModule } from "@angular/core";

import { MatToolbarModule } from '@angular/material/toolbar'
import { MatIconModule } from '@angular/material/icon'
import { MatInputModule } from '@angular/material/input'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatButtonModule } from '@angular/material/button'
import {MatListModule} from '@angular/material/list';
import {MatCardModule} from '@angular/material/card';
import {MatMenuModule} from '@angular/material/menu';

const matModule: any[] = [
    MatToolbarModule, MatIconModule, MatInputModule,
    MatFormFieldModule, MatButtonModule, MatListModule,
    MatCardModule, MatMenuModule

]

@NgModule({
    imports: matModule,
    exports: matModule
})

export class MaterialModule {}