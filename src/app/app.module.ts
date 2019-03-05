import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';
import {
  MatToolbarModule,
  MatButtonModule,
  MatSidenavModule,
  MatIconModule,
  MatListModule,
  MatTableModule,
  MatPaginatorModule,
  MatSortModule
} from '@angular/material';
import { BasicLayoutModule } from './basic-layout/basic-layout.module';
import { RouterModule, Routes } from '@angular/router';
import { CharacterComponent } from './character/character/character.component';

const appRoutes: Routes = [
  { path: 'characters', component: CharacterComponent },
  { path: 'second-page', component: CharacterComponent },
  { path: 'third-page', component: CharacterComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    CharacterComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    LayoutModule,
    BasicLayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    RouterModule.forRoot(appRoutes),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
