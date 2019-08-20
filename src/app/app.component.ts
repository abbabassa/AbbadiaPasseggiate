import { Component, OnInit, AfterViewInit, AfterViewChecked } from '@angular/core';
import { SidebarDataService } from './services/communication/sidebar-data.service';
import { MenuTree } from './om/menu-tree';
import { MenuEntryData, MenuEntryStatus } from './om/menu-entry-data';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  // ngAfterViewChecked(): void {
  //   if(this.activateRoute.children.length > 0)
  //     this.activateRoute.children[0].url.subscribe(u => this.sidebarDataService.setMainActiveByRoute(u));
   
  // }
  
  ngOnInit(): void {
    
    this.sidebarDataService.isOpen$.subscribe(val=> this.isSideMenuOpen = val);


      

   
    
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
    if(this.isEntryDisabled(entry))
      return "nav-link disabled";

    if(this.isEntryDefault(entry))
      return "nav-link text-aplight";
    
    if(this.isEntryActive(entry))
      return "text-aplight nav-link active";
  }


}
