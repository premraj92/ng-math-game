import { Component, OnInit } from '@angular/core';
import { FormGroup , FormControl , AbstractControl} from '@angular/forms';
import { MathValidator } from '../math-validator';
import { delay , filter, scan} from 'rxjs/operators';

@Component({
  selector: 'app-equation',
  templateUrl: './equation.component.html',
  styleUrls: ['./equation.component.css']
})
export class EquationComponent implements OnInit {
  secondsPerAnswer = 0;

  mathForm = new FormGroup({
    randomNumA : new FormControl(this.randomNumGenerator()),
    randomNumB : new FormControl(this.randomNumGenerator()),
    answer : new FormControl('')
  } , [ MathValidator.addition('answer' , 'randomNumA' , 'randomNumB') ]);


  constructor() { }

  ngOnInit(): void {
    // const startDate = new Date();
    // let iterationCount = 0;

    this.mathForm.statusChanges.
    pipe(
      // allows the event to propogate further with val, only if our condition is satisfied
      filter(value => value === 'VALID'),
      delay(300),
      scan((accu) => {
        return {
          iterationCount : accu.iterationCount + 1,
          startTime: accu.startTime
        };
      } , { iterationCount: 0 , startTime: new Date() })
     ).
    subscribe(({iterationCount , startTime}) => {
      // iterationCount++;
      this.secondsPerAnswer = (new Date().getTime() - startTime.getTime()) / iterationCount / 1000;

      // this.mathForm.controls.randomNumA.setValue(this.randomNumGenerator());
      // this.mathForm.controls.randomNumB.setValue(this.randomNumGenerator());
      // this.mathForm.controls.answer.setValue('');


      // doing same task as above i.e. resetting the values of all formControls in this form group but in a more compact & easy to use forma
      // you should only use setValue if you reset all formControls in a formGroup
      this.mathForm.setValue({
        randomNumA: this.randomNumGenerator(),
        randomNumB: this.randomNumGenerator(),
        answer: ''
      });


      // should use patchValue method if you want to set only a few values inside that FormGroup, if you wanna set all props you should use
      // setValue
      // this.mathForm.patchValue({
      //   // randomNumA: this.randomNumGenerator(),
      //   randomNumB: this.randomNumGenerator(),
      //   answer: ''
      // });

    });
  }

  get a() {
    return this.mathForm.value.randomNumA;
  }

  get b() {
    return this.mathForm.value.randomNumB;
  }

  randomNumGenerator() {
    return Math.floor(Math.random() * 10);
  }

}
