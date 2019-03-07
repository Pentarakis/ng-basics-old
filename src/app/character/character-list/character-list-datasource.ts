import { DataSource } from '@angular/cdk/collections';
import { MatPaginator, MatSort } from '@angular/material';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';
import { Character } from '../model/character';

// TODO: replace this with real data from your application
const EXAMPLE_DATA: Character[] = [
  {"id":1303,"name":"Daenerys Targaryen","isFemale":true,"culture":"Valyrian","titles":["Queen of the Andals and the Rhoynar and the First Men, Lord of the Seven Kingdoms","Khaleesi of the Great Grass Sea","Breaker of Shackles/Chains","Queen of Meereen","Princess of Dragonstone"],"aliases":["Dany","Daenerys Stormborn","The Unburnt","Mother of Dragons","Mother","Mhysa","The Silver Queen","Silver Lady","Dragonmother","The Dragon Queen","The Mad King's daughter"],"born":"In 284 AC, at Dragonstone","died":"","father":null,"mother":null,"spouse":1346,"children":[],"allegiances":[378],"books":[5],"povBooks":[1,2,3,8],"playedBy":["Emilia Clarke"],"tvSeries":["Season 1","Season 2","Season 3","Season 4","Season 5", "Season 6"]},
  {"id":583,"name":"Jon Snow","isFemale":false,"culture":"Northmen","titles":["Lord Commander of the Night's Watch"],"aliases":["Lord Snow","Ned Stark's Bastard","The Snow of Winterfell","The Crow-Come-Over","The 998th Lord Commander of the Night's Watch","The Bastard of Winterfell","The Black Bastard of the Wall","Lord Crow"],"born":"In 283 AC","died":"","father":null,"mother":null,"spouse":null,"children":[],"allegiances":[362],"books":[5],"povBooks":[1,2,3,8],"playedBy":["Kit Harington"],"tvSeries":["Season 1","Season 2","Season 3","Season 4","Season 5", "Season 6"]},
  {"id":1052,"name":"Tyrion Lannister","isFemale":false,"culture":"","titles":["Acting Hand of the King (former)","Master of Coin (former)"],"aliases":["The Imp","Halfman","The boyman","Giant of Lannister","Lord Tywin's Doom","Lord Tywin's Bane","Yollo","Hugor Hill","No-Nose","Freak","Dwarf"],"born":"In 273 AC, at Casterly Rock","died":"","father":null,"mother":null,"spouse":2044,"children":[],"allegiances":[229],"books":[5,11],"povBooks":[1,2,3,8],"playedBy":["Peter Dinklage"],"tvSeries":["Season 1","Season 2","Season 3","Season 4","Season 5", "Season 6"]},
];

/**
 * Data source for the CharacterList view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class CharacterListDataSource extends DataSource<Character> {
  data: Character[] = EXAMPLE_DATA;

  constructor(private paginator: MatPaginator, private sort: MatSort) {
    super();
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<Character[]> {
    // Combine everything that affects the rendered data into one update
    // stream for the data-table to consume.
    const dataMutations = [
      observableOf(this.data),
      this.paginator.page,
      this.sort.sortChange
    ];

    // Set the paginator's length
    this.paginator.length = this.data.length;

    return merge(...dataMutations).pipe(map(() => {
      return this.getPagedData(this.getSortedData([...this.data]));
    }));
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect() {}

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: Character[]) {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return data.splice(startIndex, this.paginator.pageSize);
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: Character[]) {
    if (!this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'name': return compare(a.name, b.name, isAsc);
        case 'id': return compare(+a.id, +b.id, isAsc);
        default: return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a, b, isAsc) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
