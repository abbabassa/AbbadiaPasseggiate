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

  public readonly menuEntries : MenuTree<MenuEntryData>[];

  constructor(private router: Router) 
  {
    this.menuEntries = [];
    let menuEntry = new MenuEntryData ("Mappa", "map", "map", MenuEntryStatus.Default, );
    let menuSubEntry1 = new MenuEntryData ("Mostra Luoghi", "loc", "loc", MenuEntryStatus.Default, false);
    let menuSubEntry2 = new MenuEntryData ("Mostra Percorsi", "trails", "trails", MenuEntryStatus.Default, false);
    this.menuEntries.push (new MenuTree<MenuEntryData> (menuEntry, [menuSubEntry1,menuSubEntry2] ));

    menuEntry = new MenuEntryData ("Photos", "photo", "photo", MenuEntryStatus.Default);
    this.menuEntries.push (new MenuTree<MenuEntryData> (menuEntry));

    menuEntry = new MenuEntryData ("Link", "links", "", MenuEntryStatus.Disable);
    this.menuEntries.push (new MenuTree<MenuEntryData> (menuEntry));
  }

  isOpen$ = this.isOpen.asObservable();

  // Service message commands
  setState(isOpen: boolean) {
    this.isOpen.next(isOpen);
  }

  getActiveMainEntryIndex() : number
  {
    if(!this.menuEntries)
      return -1;
    
    return this.menuEntries.findIndex(entry => entry.value.status == MenuEntryStatus.Active)
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

  setActiveEntries(selectedMain:number, selectedSub : number, navigate = true)
  {
    
    let activeMainIndex : number= this.getActiveMainEntryIndex();
    if(activeMainIndex != selectedMain)
    {
      if(activeMainIndex >= 0)
        this.menuEntries[activeMainIndex].value.setDefault();
      this.menuEntries[selectedMain].value.setActive();
    }
    
    if(selectedSub >= 0)
    {

      // if the current main index was already selected, I check if the subindex was already active
      if(activeMainIndex == selectedMain)
      {
        let newSelChildren = this.menuEntries[selectedMain].children[selectedSub];
        if(newSelChildren.status == MenuEntryStatus.Active)
        {
          if(!newSelChildren.isExclusive)
            newSelChildren.setDefault();
            
          this.manageNavigation(selectedMain, navigate);
          return;
        }
          
      }

      if(activeMainIndex >= 0)
        this.resetSubEntryStatus(activeMainIndex, true);
      this.menuEntries[selectedMain].children[selectedSub].setActive();
      
    }
    else
    {
      if(activeMainIndex >= 0)
        this.resetSubEntryStatus(activeMainIndex);
    }

    this.manageNavigation(selectedMain, navigate);

    
    
  }
  setMainActiveByRoute(u: UrlSegment[]): void {

    let path : string =u.reduce<string>((prevVal, curVal, currIndex, array) => prevVal + (currIndex==0? "": "/") + curVal.path , "");
    
    this.resetMainEntryStatus();
    let mainIndex = this.menuEntries.findIndex(entry => entry.value.routerLink == path);
    this.setActiveEntries(mainIndex,-1, false);
    this.activateSubEntriesByUrl(mainIndex, u);
     
  }

  /**
   * It activates menu subentries of the provided main index entry based on the optional parameters of the url
   * 
   * @param mainIndex main menu entry index
   * @param u urlsegment array
   */
  private activateSubEntriesByUrl(mainIndex: number, u: UrlSegment[])
  {
    if(!this.menuEntries[mainIndex].children)
      return;

    for(let url of u)
    {
      if(url.parameters)
      {
        for(let paramKey of Object.keys( url.parameters))
        {
          let index = this.menuEntries[mainIndex].children.findIndex(entry => entry.routerLink == paramKey);
          if(index >= 0 && this.menuEntries[mainIndex].children[index].status != MenuEntryStatus.Disable)
          {

            if(+url.parameters[paramKey]==1)
              this.menuEntries[mainIndex].children[index].setActive();
            else
              this.menuEntries[mainIndex].children[index].setDefault();
          }
        }
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


  /**
   * Manages navigation from main index. Active subindexes are passed as optional parameter
   * @param mainIndex 
   */
  private manageNavigation(mainIndex : number, navigate = true)
  {
    if(!navigate)
      return;
    let mainRouterPath = "/" + this.menuEntries[mainIndex].value.routerLink;

    let optionalParameters : any = {};

    for(let child of this.menuEntries[mainIndex].children)
    {
      if(child.status != MenuEntryStatus.Disable)
      {
        optionalParameters[child.routerLink] = child.status;
      }
    
    }

    this.router.navigate([mainRouterPath, optionalParameters]);



  }





}


