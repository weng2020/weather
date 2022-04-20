import { animate, AnimationBuilder, AnimationMetadata, AnimationPlayer, style } from "@angular/animations";
import { Directive, ElementRef, HostBinding, HostListener, Renderer2 } from "@angular/core";

@Directive({
    selector: '[prevBtn]'
})
export class PrevButtonDirective{
    private player: AnimationPlayer;

    @HostListener('click', ['$event']) onClick(event){
        const children = this.el.nativeElement.parentElement.getElementsByTagName('weather-item');
        const child = children[0];    
        
        this.renderer.appendChild(this.el.nativeElement.parentElement, child); 
   
    }

    constructor(private el: ElementRef<HTMLDivElement>, private renderer: Renderer2,
        private animationBuilder: AnimationBuilder){
    }

    getSlideInAnimation(el): AnimationMetadata[] {
        return [ style({ opacity: 0, transform: `translateX(0)` }), animate('300ms cubic-bezier(0, 0.7, 1, 0.8)', style({ opacity: 1, transform: `translateX(-${el.clientWidth}px)` }))];
    }

    animate(el){
        const factory = this.animationBuilder.build(this.getSlideInAnimation(el));
        this.player = factory.create(el);
        this.player.play();
    }
}