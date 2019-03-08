import { Injectable } from '@angular/core';
import { Character } from '../model/character';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import {
  catchError
} from 'rxjs/operators';

const baseUrl = 'http://localhost:3000/character';

@Injectable({
  providedIn: 'root'
})
export class CharacterService {

  catch = () => {
    alert('Verbindungsprobleme');
    return of(null);
  }

  constructor(private httpClient: HttpClient) { }

  readAll(): Observable<Character[]> {
    return this.httpClient.get<Character[]>(baseUrl)
      .pipe(catchError(() => {
        alert('Verbindungsprobleme');
        return of([]);
      }));
  }

  read(id: number): Observable<Character> {
    return this.httpClient.get<Character>(`${baseUrl}/${id}`)
      .pipe(catchError(this.catch));
  }

  update(character: Character): Observable<Character> {
    return this.httpClient.put<Character>(`${baseUrl}/${character.id}`, character)
      .pipe(catchError(this.catch));
  }

  create(character: Character): Observable<Character> {
    return this.httpClient.post<Character>(baseUrl, character)
      .pipe(catchError(this.catch));
  }

}
