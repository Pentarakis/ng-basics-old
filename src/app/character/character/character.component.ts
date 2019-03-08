import { Component, OnDestroy, OnInit } from '@angular/core';
import { Character } from '../model/character';
import { ActivatedRoute, Router } from '@angular/router';
import { CharacterService } from '../services/character.service';
import { Observable, Subject } from 'rxjs/index';
import { filter, pluck, switchMap, takeUntil } from 'rxjs/internal/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'got-character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.css']
})
export class CharacterComponent implements OnInit, OnDestroy {

  form: FormGroup;
  selected: Character = new Character();
  isCreateMode = false;

  private destroy = new Subject<boolean>();

  constructor(private characterService: CharacterService,
              private router: Router,
              private route: ActivatedRoute,
              private fb: FormBuilder) {
  }

  ngOnInit() {
    this.initForm();

    const id$ = this.route.params.pipe(pluck('id'));
    id$
      .pipe(
        filter(id => !id),
        takeUntil(this.destroy)
      )
      .subscribe(() => {
        this.form.patchValue(new Character());
        this.isCreateMode = true;
      });
    id$
      .pipe(
        filter(id => !!id),
        switchMap((id: number) => this.characterService.read(Number(id))),
        takeUntil(this.destroy)
      )
      .subscribe((character: Character) => {
        this.form.patchValue(character);
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

  private initForm(): void {
    this.form = this.fb.group({
      id: [{ value: null, disabled: true }],
      name: [null, [Validators.required, Validators.maxLength(30)]],
      culture: [null],
      born: [null]
    });
  }

  private createOrUpdate(): Observable<Character> {
    if (!this.form.valid) {
      return;
    }
    if (this.isCreateMode) {
      return this.characterService.create(this.form.getRawValue());
    } else {
      return this.characterService.update(this.form.getRawValue());
    }
  }

  ngOnDestroy(): void {
    this.destroy.next(true);
    this.destroy.complete();
  }
}
