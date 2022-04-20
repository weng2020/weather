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
        
        const t = this.renderer.appendChild(this.el.nativeElement.parentElement, child); 
        for(let i = 0; i < children.length; i++){
            this.animate(children[i])
        }
        console.log(t)
        // this.renderer.insertBefore(this.el.nativeElement.parentElement, child, children[children.length - 1]);  

   
    }

    constructor(private el: ElementRef<HTMLDivElement>, private renderer: Renderer2,
        private animationBuilder: AnimationBuilder){
        console.log(this.el.nativeElement.parentElement.getElementsByTagName('weather-item'))
    }

    getSlideInAnimation(el): AnimationMetadata[] {
        return [ style({ opacity: 0, transform: `translateX(0)` }), animate('300ms cubic-bezier(0, 0.7, 1, 0.8)', style({ opacity: 1, transform: `translateX(-${el.clientWidth}px)` }))];
    }

    animate(el){
        const factory = this.animationBuilder.build(this.getSlideInAnimation(el));
        this.player = factory.create(el);
        this.player.play();
        // this.player.onDone(() => {
        //   this.player.destroy();
        // });
    }
}