export interface Character {
  id?: number;
  name: string;
  culture: string;
  born: string;
  died: string;

  father: any;
  mother: any;

  spouse: number;

  isFemale?: any;
  titles?: any;
  aliases?: any;
  children?: any;
  allegiances?: any;
  books?: any;
  povBooks?: any;
  playedBy?: any;
  tvSeries?: any;
}
