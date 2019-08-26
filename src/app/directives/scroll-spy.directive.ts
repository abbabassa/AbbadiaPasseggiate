import { Directive, Input, Output, HostListener, EventEmitter, ElementRef, ɵConsole } from '@angular/core';

@Directive({
  selector: '[scrollSpy]'
})
export class ScrollSpyDirective {
  @Input() public querySelector :string ;
  @Input() public useOffset : boolean = false;
  @Input() public offset : number = 0;
  @Output() public sectionChange = new EventEmitter<string>();
  private currentSection: string;

  constructor(private _el: ElementRef) {}

  @HostListener('scroll', ['$event'])
  onScroll(event: any) {
      let currentSection: string;
      const children = this._el.nativeElement.children;
      const scrollTop = event.target.scrollTop;

      let offset = this.useOffset? this.offset : this.getOffset(event.target);
      const parentOffset = event.target.offsetTop;
      for (let i = 0; i < children.length; i++) {
          const element = children[i];
          let selectedEls = (element as Element).querySelectorAll(this.querySelector)
          for (let j = 0; j < selectedEls.length; j++)
          {
                let selectedElement = selectedEls[j] as any;
                if ((selectedElement.offsetTop - parentOffset) <= scrollTop + offset) {
                    currentSection = selectedEls[j].id;
            }
          }
      }
      if (currentSection !== this.currentSection) {
          this.currentSection = currentSection;
          this.sectionChange.emit(this.currentSection);
      }
  }

  getScrollPercentage(targetEl)
  {
      if(targetEl.scrollHeight -targetEl.offsetHeight == 0)
        return 0;
      return targetEl.scrollTop/ (targetEl.scrollHeight -targetEl.offsetHeight)

  }

  getOffset(targetEl)
  {
      return this.getScrollPercentage(targetEl) * targetEl.offsetHeight;
  }

}

