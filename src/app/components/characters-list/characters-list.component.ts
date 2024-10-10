import { CommonModule } from '@angular/common';
import { Component, HostListener, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CharactersService } from '../../services/characters.service';
import { Characters } from '../../interfaces/characters';


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
  nextPageUrl: string | null = null;
  loading: boolean = false;
  charactersService = inject(CharactersService);

  constructor(private fb: FormBuilder) {
    this.formSearch = this.fb.group({
      'searchName': ['']
    });
  }

  ngOnInit() {

    this.getAllCharacters();
    this.inputSubscribe();

  }

  getAllCharacters() {
    this.charactersService.getCharactersByName('').subscribe(data => {
      this.arrCharacters = data.results;
      this.noResults = this.arrCharacters.length === 0;
      this.nextPageUrl = data.info.next;
    });
  }

  
  inputSubscribe(){

    this.formSearch.get('searchName')?.valueChanges.subscribe(value => {
      this.filterByName(value);
    });

  }


  filterByName(searchValue: string) {
    if (searchValue.trim() === '') {
      this.getAllCharacters();
    } else {
      this.charactersService.getCharactersByName(searchValue).subscribe({
        next: data => {
          this.arrCharacters = data.results;
          this.noResults = this.arrCharacters.length === 0;
          this.nextPageUrl = data.info.next;
        },
        error: err => {
          this.arrCharacters = [];
          this.noResults = true;
          this.nextPageUrl = null;
        }
      });
      this.scrollToTop();
    }
  }


  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  @HostListener('window:scroll', [])
  onScroll(): void {

    if (this.loading || !this.nextPageUrl) return;

    const threshold = 300;
    const position = window.innerHeight + window.scrollY;
    const height = document.body.offsetHeight;

    if (position + threshold >= height) {
      this.loadMoreCharacters();
    }
  }


  loadMoreCharacters() {
    if (!this.nextPageUrl) return;

    this.loading = true;
    this.charactersService.getMoreCharactersByUrl(this.nextPageUrl).subscribe({
      next: data => {
        this.arrCharacters = [...this.arrCharacters, ...data.results];
        this.nextPageUrl = data.info.next;
        this.loading = false;
      },
      error: err => {
        console.error(err);
        this.loading = false;
      }
    });
  }

}
