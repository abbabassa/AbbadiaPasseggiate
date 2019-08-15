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
  private subActiveChange = new Subject<boolean>();

  public readonly menuEntries : MenuTree<MenuEntryData>[];

  constructor() 
  {
    this.menuEntries = [];
    let menuEntry = new MenuEntryData ("Mappa", "map", "map", MenuEntryStatus.Default, );
    let menuSubEntry1 = new MenuEntryData ("Mostra Luoghi", "loc", "", MenuEntryStatus.Default, false);
    let menuSubEntry2 = new MenuEntryData ("Mostra Percorsi", "trails", "", MenuEntryStatus.Default, false);
    this.menuEntries.push (new MenuTree<MenuEntryData> (menuEntry, [menuSubEntry1,menuSubEntry2] ));

    menuEntry = new MenuEntryData ("Photos", "photo", "photo", MenuEntryStatus.Default);
    this.menuEntries.push (new MenuTree<MenuEntryData> (menuEntry));

    menuEntry = new MenuEntryData ("Link", "links", "", MenuEntryStatus.Disable);
    this.menuEntries.push (new MenuTree<MenuEntryData> (menuEntry));
  }

  isOpen$ = this.isOpen.asObservable();
  mainActive$ = this.mainActive.asObservable();
  subActiveChange$ = this.subActiveChange.asObservable();

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
            this.subActiveChange.next(true);
            return;
          }

        }
          
      }

      if(activeMainIndex >= 0)
        this.resetSubEntryStatus(activeMainIndex, true);
      this.menuEntries[selectedMain].children[selectedSub].setActive();
      this.subActiveChange.next(true);
    }
    else
    {
      if(activeMainIndex >= 0)
        this.resetSubEntryStatus(activeMainIndex);
      this.subActiveChange.next(false);
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

  public getActiveSub(mainIndex: number ) : MenuEntryData[]
  public getActiveSub(routerLinkPath : string ) : MenuEntryData[]
  public getActiveSub(param : string | number ) : MenuEntryData[]
  {
    let mainIndex;
    let routerLinkPath;
    if(typeof param === 'string')
    {
      routerLinkPath = param;
    }
    else
    {
      mainIndex = param;
    }

    if(!mainIndex)
    {
      if(!routerLinkPath)
      {
        return;
      }
      else
      {
        for(let i = 0; i < this.menuEntries.length; i++)
        {
          if(this.menuEntries[i].value.routerLink == routerLinkPath)
          {
            mainIndex = i;
            break;
          }
        }
      }

    


    }
    return this.menuEntries[mainIndex].children.filter(entry => entry.status == MenuEntryStatus.Active)

  }





}


