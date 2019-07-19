import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs';
import { DescReferences } from '../../om/desc-references';

@Injectable()
export class PreviewService {

  private isOpenSource = new Subject<boolean>();
  private newRef = new Subject<DescReferences>();

  constructor() { }

  isOpen$ = this.isOpenSource.asObservable();
  newRef$ = this.newRef.asObservable();

  // Service message commands
  setState(isOpen: boolean) {
    this.isOpenSource.next(isOpen);
  }

  setNewRef(ref:DescReferences )
  {
    this.newRef.next(ref);
  }

}
