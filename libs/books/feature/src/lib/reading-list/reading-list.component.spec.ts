import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { createBook, createReadingListItem, SharedTestingModule } from '@tmo/shared/testing';

import { ReadingListComponent } from './reading-list.component';
import { BooksFeatureModule } from '@tmo/books/feature';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Actions, ofType } from '@ngrx/effects';
import { Overlay } from '@angular/cdk/overlay';
import { ReadingListItem } from '@tmo/shared/models';
import { confirmedRemoveFromReadingList, removeFromReadingList } from '@tmo/books/data-access';

describe('ReadingListComponent', () => {
  let component: ReadingListComponent;
  let fixture: ComponentFixture<ReadingListComponent>;
  let store: MockStore;
  let snackbar: MatSnackBar;
  let actions$: Actions;
  const initialState = {
    loaded: false,
  };
  
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [BooksFeatureModule, SharedTestingModule],
      providers: [
        provideMockStore({ initialState }),
        MatSnackBar,
        Overlay,
        Actions,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadingListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call addToReadingList action', () => {
    const dispatchSpy = spyOn(store, 'dispatch');
    const item: ReadingListItem = createReadingListItem('abc');
    component.removeFromReadingList(item);
    expect(dispatchSpy).toHaveBeenCalledTimes(1);
    expect(dispatchSpy).toHaveBeenCalledWith(removeFromReadingList({ item }));
  });

  it('should execute Snackbar', () => {
    const snackBarSpy = spyOn(snackbar, 'open');    
    const item: ReadingListItem = createReadingListItem('abc');
    component.removeFromReadingList(item);
    actions$.pipe(ofType(confirmedRemoveFromReadingList)).subscribe(({ item }) => {
      expect(snackBarSpy).toHaveBeenCalledWith(
        `${item.title} removed from reading list`,
        'Undo'
      );
    });
  });

});
