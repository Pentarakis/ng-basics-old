import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CharacterListComponent } from './character-list/character-list.component';
import { CharacterComponent } from './character/character.component';

const appRoutes: Routes = [
  { path: '', component: CharacterListComponent, pathMatch: 'full' },
  { path: ':id', component: CharacterComponent }
];
@NgModule({
  imports: [RouterModule.forChild(appRoutes)],
  exports: [RouterModule]
})
export class CharacterRoutingModule { }
