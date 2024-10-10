import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CharactersService } from '../../services/characters.service';
import { Characters, CharactersList } from '../../interfaces/characters';


@Component({
  selector: 'app-characters-list',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './characters-list.component.html',
  styleUrl: './characters-list.component.scss'
})


export class CharactersListComponent implements OnInit {

  public formSearch: FormGroup;
  arrCharacters: Characters[] = [];
  noResults: boolean = false; 
  charactersService = inject(CharactersService);

  constructor(private fb: FormBuilder) {
    this.formSearch = this.fb.group({
      'searchName': ['']
    });
  }

  ngOnInit() {
    this.getAllCharacters();
  }

  getAllCharacters() {
    this.charactersService.getCharactersByName('').subscribe(data => {
      this.arrCharacters = data.results;
      this.noResults = this.arrCharacters.length === 0;
    });
  }

  filterByName() {
    const searchValue = this.formSearch.get('searchName')?.value;

    if (searchValue.trim() === '') {
      this.getAllCharacters();

    } else {
      this.charactersService.getCharactersByName(searchValue).subscribe(data => {
        this.arrCharacters = data.results;
        this.noResults = this.arrCharacters.length === 0;
      }, err => {
        this.arrCharacters = [];
        this.noResults = true;
      });
    }
    
  }
}
