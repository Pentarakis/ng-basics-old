import { Component, OnInit } from '@angular/core';
import { Character } from '../model/character';
import { ActivatedRoute, Router } from '@angular/router';
import { CharacterService } from '../services/character.service';

@Component({
  selector: 'got-character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.css']
})
export class CharacterComponent implements OnInit {

  selected: Character = new Character();
  isCreateMode = false;

  constructor(private characterService: CharacterService, private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit() {
    const id = this.route.snapshot.params.id;
    if (id === 'create') {
      this.selected = new Character();
      this.isCreateMode = true;
    } else if (id) {
      const character = this.characterService.read(Number(id));
      if (character) {
        this.selected = character;
      }
    }
  }

  save(): void {
    if (this.isCreateMode) {
      this.characterService.create(this.selected);
    } else {
      this.characterService.update(this.selected);
    }
    this.router.navigate([`../`], { relativeTo: this.route });
  }

}
