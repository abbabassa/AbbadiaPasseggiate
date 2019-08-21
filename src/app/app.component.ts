import { Component, OnInit, AfterViewInit, AfterViewChecked } from '@angular/core';
import { SidebarDataService } from './services/communication/sidebar-data.service';
import { MenuTree } from './om/menu-tree';
import { MenuEntryData, MenuEntryStatus } from './om/menu-entry-data';
import { Router, ActivatedRoute } from '@angular/router';
import { timeInterval } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
  /**
   * Added to skip some view changes on the loading of the page, that are triggered by some modification in sidebarDataServices.
   * These changes can lead to angular exceptions (ExpressionChangedAfterItHasBeenCheckedError)
   */
  public canGPHBeProcessed = false;
  
  ngOnInit(): void {
    
    this.sidebarDataService.isOpen$.subscribe(val=>
      { 
        if(!this.canGPHBeProcessed && val)
          this.canGPHBeProcessed = true;
        this.isSideMenuOpen = val
      });

  }


  constructor(
    private sidebarDataService: SidebarDataService,
    private activateRoute:ActivatedRoute,
    private router: Router
    ){}


  public isSideMenuOpen : boolean;

  public get MenuEntries() : MenuTree<MenuEntryData>[]
  {
    return this.sidebarDataService.menuEntries;
  }


  public isEntryActive(entry:MenuEntryData) : boolean
  {
    return entry.status == MenuEntryStatus.Active;
  }

  public isEntryDefault(entry:MenuEntryData) : boolean
  {
    return entry.status == MenuEntryStatus.Default;
  }

  public isEntryDisabled(entry:MenuEntryData) : boolean
  {
    return entry.status == MenuEntryStatus.Disable;
  }

  public setActiveMenuEntriess(selectedMain:number, selectedSub : number)
  {
    this.sidebarDataService.setActiveEntries(selectedMain, selectedSub);
  }

  public getAnchorClass(entry:MenuEntryData):string
  {
    if(!this.canGPHBeProcessed)
      return "";
    let result:string;


    if(this.isEntryDisabled(entry))
      result= "nav-link disabled";
    else if(this.isEntryDefault(entry))
      result = "nav-link text-aplight";
    else if(this.isEntryActive(entry))
      result = "text-aplight nav-link active";


    return result;
  }


}
