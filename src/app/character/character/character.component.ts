import { Component, OnInit } from '@angular/core';
import { Character } from '../model/character';
import { ActivatedRoute, Router } from '@angular/router';
import { CharacterService } from '../services/character.service';
import { Observable } from 'rxjs/index';

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
      this.characterService.read(Number(id))
        .subscribe((character: Character) => {
          this.selected = character;
        });
    }
  }

  save(): void {
    this.createOrUpdate().subscribe(() => {
      alert('Speichern erfoglreich!');
    });
    this.router.navigate([`../`], { relativeTo: this.route });
  }

  private createOrUpdate(): Observable<Character> {
    if (this.isCreateMode) {
      return this.characterService.create(this.selected);
    } else {
      return this.characterService.update(this.selected);
    }
  }
}
