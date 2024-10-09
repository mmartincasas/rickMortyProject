import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { CharactersList } from '../interfaces/characters';

@Injectable({
  providedIn: 'root'
})
export class CharactersService {

  private url = "https://rickandmortyapi.com/api/character";

  httpClient = inject (HttpClient);

  getAll(){
    return this.httpClient.get<CharactersList>(this.url);
  }
  
}
