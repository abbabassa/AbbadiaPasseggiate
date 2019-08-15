import { Injectable } from '@angular/core';
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
    let menuEntry = new MenuEntryData ("Mappa", "", "", MenuEntryStatus.Default, );
    let menuSubEntry1 = new MenuEntryData ("Mostra Luoghi", "", "", MenuEntryStatus.Default);
    let menuSubEntry2 = new MenuEntryData ("Mostra Percorsi", "", "", MenuEntryStatus.Default);
    this.menuEntries.push (new MenuTree<MenuEntryData> (menuEntry, [menuSubEntry1,menuSubEntry2] ));

    menuEntry = new MenuEntryData ("Photos", "", "", MenuEntryStatus.Disable);
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


  getActiveSubEntryIndex(mainIndex : number) : number
  {
    for(let i = 0; i < this.menuEntries[mainIndex].children.length; i++)
    {
      if(this.menuEntries[mainIndex].children[i].status == MenuEntryStatus.Active)
        return i;
    }

    return -1;
  }

  resetSubEntryStatus(mainIndex : number)
  {
    for(let i = 0; i < this.menuEntries[mainIndex].children.length; i++)
    {
      this.menuEntries[mainIndex].children[i].setDefault();
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

      // if I already was in the current main index, I check if I really need to push the change sub event
      if(activeMainIndex == selectedMain)
      {
        if(this.getActiveSubEntryIndex(activeMainIndex) == selectedSub)
          return;
      }

      if(activeMainIndex >= 0)
        this.resetSubEntryStatus(activeMainIndex);
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



}


