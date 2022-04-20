import { Directive, ElementRef, HostBinding, HostListener, Renderer2 } from "@angular/core";

@Directive({
    selector: '[nextBtn]'
})
export class NextBtnDirective{

    @HostListener('click', ['$event']) onClick(event){
        const children = this.el.nativeElement.parentElement.getElementsByTagName('weather-item');
        const child = children[children.length - 1];
        this.renderer.removeChild(this.el.nativeElement.parentElement, child);
        this.renderer.insertBefore(this.el.nativeElement.parentElement, child, children[0]);
        
    }

    constructor(private el: ElementRef<HTMLDivElement>, private renderer: Renderer2){
        console.log(this.el.nativeElement.parentElement.getElementsByTagName('weather-item'))
    }

}