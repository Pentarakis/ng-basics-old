import { Component, OnInit } from '@angular/core';
import { Character } from '../model/character';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'got-character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.css']
})
export class CharacterComponent implements OnInit {

  selected: Character = {};

  ngOnInit() {
  }

  addNewCharacter(): void {
    this.selected = {};
  }

}
