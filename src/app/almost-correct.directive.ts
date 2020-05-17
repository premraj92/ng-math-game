import { Directive , ElementRef, OnInit } from '@angular/core';
import { NgControl } from '@angular/forms';
import { map , filter } from 'rxjs/operators';

// just a directive to highlight the input if user enters a very close value as answer within -+20% err prob
// its very easily achievable with ngClass but just to understand how directives & form ele its applied to, communicates
// using formControl & formGroup we are doing it this way
@Directive({
  selector: '[appAlmostCorrect]'
})
export class AlmostCorrectDirective implements OnInit {

  constructor(private el: ElementRef , private directiveControl: NgControl) {}

  ngOnInit() {
    // console.log(this.directiveControl.control.parent);
    this.directiveControl.control.parent.valueChanges.
    pipe(
      map(({randomNumA , randomNumB , answer}) => {
        return Math.abs( (((randomNumA + randomNumB) - answer) / (randomNumA + randomNumB)) * 100 ) ;
      })
    )
    .subscribe((value) => {
      value <= 20 ? this.el.nativeElement.classList.add('almost-correct') : this.el.nativeElement.classList.remove('almost-correct');
    });
  }
}
