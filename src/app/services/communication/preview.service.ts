import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject }    from 'rxjs';
import { DescReferences, DescRefTypes } from '../../om/desc-references';
import { TrailHeaderData } from '../../om/trail-header-data';
import { TrailParDesc } from '../../om/trail-par-desc';

@Injectable()
export class PreviewService {

  private isOpenSource = new Subject<boolean>();
  private newRef = new Subject<DescReferences>();
  private trailHeaderData = new Subject<TrailHeaderData>();
  private trailActiveSection = new BehaviorSubject<TrailParDesc>(null);


  constructor() { }

  isOpen$ = this.isOpenSource.asObservable();
  newRef$ = this.newRef.asObservable();
  trailHeaderData$ = this.trailHeaderData.asObservable();
  trailActiveSection$= this.trailActiveSection.asObservable();

  // Service message commands
  setState(isOpen: boolean) {
    this.isOpenSource.next(isOpen);
  }

  setNewRef(ref:DescReferences )
  {
    this.newRef.next(ref);
    if(ref.type == DescRefTypes.Location)
    {
      this.setTrailHeaderData(null);
    }
  }

  setTrailHeaderData(hd : TrailHeaderData)
  {
    this.trailHeaderData.next(hd);
  }

  setTrailActiveSection(as : TrailParDesc)
  {
    this.trailActiveSection.next(as);
  }

  getTrailActiveSectionCurrentVal() : TrailParDesc
  {
    return this.trailActiveSection.value;
  }


}
