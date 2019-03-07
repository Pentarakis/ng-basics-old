import { Component, OnInit } from '@angular/core';
import { Character } from '../model/character';

@Component({
  selector: 'got-character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.css']
})
export class CharacterComponent implements OnInit {

  character: Character = {};

  constructor() { }

  ngOnInit() {
  }

}
