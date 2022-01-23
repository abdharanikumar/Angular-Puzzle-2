import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { addToReadingList, searchBooks } from '@tmo/books/data-access';
import { Book } from '@tmo/shared/models';
import { createBook, SharedTestingModule } from '@tmo/shared/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BooksFeatureModule } from '../books-feature.module';
import { BookSearchComponent } from './book-search.component';

describe('ProductsListComponent', () => {
  let component: BookSearchComponent;
  let fixture: ComponentFixture<BookSearchComponent>;
  let store: MockStore;
  const initialState = { loaded: false };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BooksFeatureModule,
        NoopAnimationsModule,
        SharedTestingModule,
        ReactiveFormsModule,
        FormsModule,
      ],
      providers: [provideMockStore({ initialState })],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookSearchComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });

  it('should search for javascript books on clicking javascript link on empty page', () => {
    const termField = component.searchForm.controls['term'];
    component.searchExample();
    termField.valueChanges.subscribe((val) => {
      expect(val).toBe('javascript');
    });
  });

  it('should dispatch addToReadingList action', () => {
    const dispatchSpy = spyOn(store, 'dispatch');
    const book: Book = createBook('A');
    component.addBookToReadingList(book);
    expect(dispatchSpy).toHaveBeenCalledTimes(1);
    expect(dispatchSpy).toHaveBeenCalledWith(addToReadingList({ book }));
  });

  it('should call searchBooks method', () => {
    const dispatchSpy = spyOn(store, 'dispatch');
    const termField = component.searchForm.controls['term'];
    component.ngOnInit();
    termField.valueChanges.subscribe(() => {
      expect(dispatchSpy).toHaveBeenCalledTimes(1);
      expect(dispatchSpy).toHaveBeenCalled();
    });
  });

});
