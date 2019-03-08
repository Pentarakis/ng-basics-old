import { Component, OnDestroy, OnInit } from '@angular/core';
import { Character } from '../model/character';
import { ActivatedRoute, Router } from '@angular/router';
import { CharacterService } from '../services/character.service';
import { Observable, Subject } from 'rxjs/index';
import { filter, pluck, switchMap, takeUntil } from 'rxjs/internal/operators';

@Component({
  selector: 'got-character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.css']
})
export class CharacterComponent implements OnInit, OnDestroy {

  selected: Character = new Character();
  isCreateMode = false;

  private destroy = new Subject<boolean>();

  constructor(private characterService: CharacterService, private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit() {

    const id$ = this.route.params.pipe(pluck('id'));
    id$
      .pipe(
        filter(id => !id),
        takeUntil(this.destroy)
      )
      .subscribe(() => {
        this.selected = new Character();
        this.isCreateMode = true;
      });
    id$
      .pipe(
        filter(id => !!id),
        switchMap((id: number) => this.characterService.read(Number(id))),
        takeUntil(this.destroy)
      )
      .subscribe((character: Character) => {
        this.selected = character;
      });
  }

  save(): void {
    this.createOrUpdate()
      .pipe(
        takeUntil(this.destroy)
      )
      .subscribe(() => {
        alert('Speichern erfoglreich!');
        this.router.navigate([`../`], { relativeTo: this.route });
      });
  }

  private createOrUpdate(): Observable<Character> {
    if (this.isCreateMode) {
      return this.characterService.create(this.selected);
    } else {
      return this.characterService.update(this.selected);
    }
  }

  ngOnDestroy(): void {
    this.destroy.next(true);
    this.destroy.complete();
  }
}
