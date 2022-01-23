import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Actions, ofType } from '@ngrx/effects';
import { createBook, SharedTestingModule } from '@tmo/shared/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { BooksFeatureModule } from '../books-feature.module';
import { BookSearchComponent } from './book-search.component';
import { Book } from '@tmo/shared/models';
import { addToReadingList, confirmedAddToReadingList } from '@tmo/books/data-access';
import { Overlay } from '@angular/cdk/overlay';

describe('ProductsListComponent', () => {
  let component: BookSearchComponent;
  let fixture: ComponentFixture<BookSearchComponent>;
  // tslint:disable-next-line: prefer-const
  let store: MockStore;
  // tslint:disable-next-line: prefer-const
  let snackbar: MatSnackBar;
  // tslint:disable-next-line: prefer-const
  let actions$: Actions;
  const initialState = {
    loaded: false,
  };
  
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [BooksFeatureModule, NoopAnimationsModule, SharedTestingModule],
      providers: [
        provideMockStore({ initialState }),
        MatSnackBar,
        Overlay,
        Actions,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });

  it('should call addBookToReadingList action', () => {
    const dispatchSpy = spyOn(store, 'dispatch');
    const book: Book = createBook('abc');
    component.addBookToReadingList(book);
    expect(dispatchSpy).toHaveBeenCalledTimes(1);
    expect(dispatchSpy).toHaveBeenCalledWith(addToReadingList({ book }));
  });

  it('should execute Snackbar', () => {
    const snackBarSpy = spyOn(snackbar, 'open');    
    const book: Book = createBook('abc');
    component.addBookToReadingList(book);
    // tslint:disable-next-line: no-shadowed-variable
    actions$.pipe(ofType(confirmedAddToReadingList)).subscribe(({ book }) => {
      expect(snackBarSpy).toHaveBeenCalledWith(
        `${book.title} added to reading list`,
        'Undo'
      );
    });
  });
});
