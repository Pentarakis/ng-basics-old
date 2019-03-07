import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { CharacterListDataSource } from './character-list-datasource';
import { Character } from '../model/character';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'got-character-list',
  templateUrl: './character-list.component.html',
  styleUrls: ['./character-list.component.css']
})
export class CharacterListComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: CharacterListDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'name', 'culture', 'born'];

  constructor(private router: Router,
              private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.dataSource = new CharacterListDataSource(this.paginator, this.sort);
  }

  navigate(character: Character) {
    this.router.navigate([`./${character.id}`], {
      relativeTo: this.route
    });
  }
}
