import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BasicLayoutModule } from './basic-layout/basic-layout.module';
import { RouterModule, Routes } from '@angular/router';
import { CharacterComponent } from './character/character/character.component';
import { FormsModule } from '@angular/forms';
import {
  MatButtonModule,
  MatCardModule,
  MatFormFieldModule,
  MatInputModule,
  MatTableModule,
  MatPaginatorModule,
  MatSortModule
} from '@angular/material';
import { CharacterListComponent } from './character/character-list/character-list.component';

const appRoutes: Routes = [
  { path: 'character', component: CharacterListComponent, pathMatch: 'full' },
  { path: 'character/:id', component: CharacterComponent },
  { path: 'third-page', component: CharacterComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    CharacterComponent,
    CharacterListComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    BasicLayoutModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    RouterModule.forRoot(appRoutes),
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
