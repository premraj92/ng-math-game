import { AbstractControl } from '@angular/forms';

export class MathValidator {
   static addition(sum , source1 , source2) {
      return (form: AbstractControl) => {
        // const {randomNumA , randomNumB , answer} = form.value;
        const firstNum = form.value[source1];
        const secondNum = form.value[source2];
        const answer = form.value[sum];

        if (firstNum + secondNum === parseInt(answer)) {
            return null;
        } else {
            return {addition : 'Your answer is wrong'};
        }
       };
    }
}
