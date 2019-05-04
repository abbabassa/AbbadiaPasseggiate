import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs/Subject';

@Injectable()
export class PreviewStateService {

  private isOpenSource = new Subject<boolean>();

  constructor() { }

  isOpen$ = this.isOpenSource.asObservable();

  // Service message commands
  setState(isOpen: boolean) {
    this.isOpenSource.next(isOpen);
  }

}
