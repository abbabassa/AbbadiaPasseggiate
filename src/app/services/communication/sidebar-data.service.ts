import { Injectable } from '@angular/core';
import {UrlSegment, Router} from '@angular/router';
import { Subject, BehaviorSubject }    from 'rxjs';
import { MenuTree } from '../../om/menu-tree';
import { MenuEntryData, MenuEntryStatus } from '../../om/menu-entry-data';

@Injectable()
export class SidebarDataService {
  
  // As from documentation: A Subject that requires an initial value and emits its current value to new subscribers
  // that's the best option in this case
  private isOpen = new BehaviorSubject<boolean>(false);
  private mainActive = new Subject<number>();
  private subActive = new Subject<number>();

  public readonly menuEntries : MenuTree<MenuEntryData>[];

  constructor() 
  {
    this.menuEntries = [];
    let menuEntry = new MenuEntryData ("Mappa", "", "map", MenuEntryStatus.Default, );
    let menuSubEntry1 = new MenuEntryData ("Mostra Luoghi", "", "", MenuEntryStatus.Default, false);
    let menuSubEntry2 = new MenuEntryData ("Mostra Percorsi", "", "", MenuEntryStatus.Default, false);
    this.menuEntries.push (new MenuTree<MenuEntryData> (menuEntry, [menuSubEntry1,menuSubEntry2] ));

    menuEntry = new MenuEntryData ("Photos", "", "photo", MenuEntryStatus.Default);
    this.menuEntries.push (new MenuTree<MenuEntryData> (menuEntry));

    menuEntry = new MenuEntryData ("Link", "", "", MenuEntryStatus.Disable);
    this.menuEntries.push (new MenuTree<MenuEntryData> (menuEntry));
  }

  isOpen$ = this.isOpen.asObservable();
  mainActive$ = this.mainActive.asObservable();
  subActive$ = this.subActive.asObservable();

  // Service message commands
  setState(isOpen: boolean) {
    this.isOpen.next(isOpen);
  }

  getActiveMainEntryIndex() : number
  {
    for(let i = 0; i < this.menuEntries.length; i++)
    {
      if(this.menuEntries[i].value.status == MenuEntryStatus.Active)
        return i;
    }

    return -1;
  }



  resetSubEntryStatus(mainIndex : number, leaveNotExclusive = false)
  {
    for(let i = 0; i < this.menuEntries[mainIndex].children.length; i++)
    {
      if(leaveNotExclusive && !this.menuEntries[mainIndex].children[i].isExclusive )
        continue;

      this.menuEntries[mainIndex].children[i].setDefault();
    }
  }


  resetMainEntryStatus()
  {
    for(let i = 0; i < this.menuEntries.length; i++)
    {
      if(this.menuEntries[i].value.status != MenuEntryStatus.Disable)
        this.menuEntries[i].value.setDefault();
    }
  }

  setActiveEntries(selectedMain:number, selectedSub : number)
  {
    
    let activeMainIndex : number= this.getActiveMainEntryIndex();
    if(activeMainIndex != selectedMain)
    {
      if(activeMainIndex >= 0)
        this.menuEntries[activeMainIndex].value.setDefault();
      this.menuEntries[selectedMain].value.setActive();
      this.mainActive.next(selectedMain);
    }
    
    if(selectedSub >= 0)
    {

      // ifthe current main index was already selected, I check if the subindex was already active
      if(activeMainIndex == selectedMain)
      {
        let newSelChildren = this.menuEntries[selectedMain].children[selectedSub];
        if(newSelChildren.status == MenuEntryStatus.Active)
        {
          if(newSelChildren.isExclusive)
            return;
          else
          {
            newSelChildren.setDefault();
            return;
          }

        }
          
      }

      if(activeMainIndex >= 0)
        this.resetSubEntryStatus(activeMainIndex, true);
      this.menuEntries[selectedMain].children[selectedSub].setActive();
      this.subActive.next(selectedSub);
    }
    else
    {
      if(activeMainIndex >= 0)
        this.resetSubEntryStatus(activeMainIndex);
      this.subActive.next(-1);
    }

    
    
  }
  setMainActiveByRoute(u: UrlSegment[]): void {

    let path : string =u.reduce<string>((prevVal, curVal, currIndex, array) => prevVal + (currIndex==0? "": "/") + curVal.path , "");
    
    for(let i = 0; i < this.menuEntries.length; i++)
    {
      if(this.menuEntries[i].value.routerLink == path)
      {
        this.resetMainEntryStatus();
        this.setActiveEntries(i,-1);
      }
    }
  }



}


