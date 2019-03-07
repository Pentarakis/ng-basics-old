import { Component, OnInit } from '@angular/core';
import { Character } from '../model/character';

@Component({
  selector: 'got-character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.css']
})
export class CharacterComponent implements OnInit {

  selected: Character = {};
  characters: Character[] = [
    {"id":1303,"name":"Daenerys Targaryen","isFemale":true,"culture":"Valyrian","titles":["Queen of the Andals and the Rhoynar and the First Men, Lord of the Seven Kingdoms","Khaleesi of the Great Grass Sea","Breaker of Shackles/Chains","Queen of Meereen","Princess of Dragonstone"],"aliases":["Dany","Daenerys Stormborn","The Unburnt","Mother of Dragons","Mother","Mhysa","The Silver Queen","Silver Lady","Dragonmother","The Dragon Queen","The Mad King's daughter"],"born":"In 284 AC, at Dragonstone","died":"","father":null,"mother":null,"spouse":1346,"children":[],"allegiances":[378],"books":[5],"povBooks":[1,2,3,8],"playedBy":["Emilia Clarke"],"tvSeries":["Season 1","Season 2","Season 3","Season 4","Season 5", "Season 6"]},
    {"id":583,"name":"Jon Snow","isFemale":false,"culture":"Northmen","titles":["Lord Commander of the Night's Watch"],"aliases":["Lord Snow","Ned Stark's Bastard","The Snow of Winterfell","The Crow-Come-Over","The 998th Lord Commander of the Night's Watch","The Bastard of Winterfell","The Black Bastard of the Wall","Lord Crow"],"born":"In 283 AC","died":"","father":null,"mother":null,"spouse":null,"children":[],"allegiances":[362],"books":[5],"povBooks":[1,2,3,8],"playedBy":["Kit Harington"],"tvSeries":["Season 1","Season 2","Season 3","Season 4","Season 5", "Season 6"]},
    {"id":1052,"name":"Tyrion Lannister","isFemale":false,"culture":"","titles":["Acting Hand of the King (former)","Master of Coin (former)"],"aliases":["The Imp","Halfman","The boyman","Giant of Lannister","Lord Tywin's Doom","Lord Tywin's Bane","Yollo","Hugor Hill","No-Nose","Freak","Dwarf"],"born":"In 273 AC, at Casterly Rock","died":"","father":null,"mother":null,"spouse":2044,"children":[],"allegiances":[229],"books":[5,11],"povBooks":[1,2,3,8],"playedBy":["Peter Dinklage"],"tvSeries":["Season 1","Season 2","Season 3","Season 4","Season 5", "Season 6"]},
  ];

  constructor() { }

  ngOnInit() {
  }

  addNewCharacter(): void {
    this.characters.push(this.selected);
    this.selected = {};
  }

}
