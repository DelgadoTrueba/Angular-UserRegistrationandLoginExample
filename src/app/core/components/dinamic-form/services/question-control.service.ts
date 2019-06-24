// a simple service for transforming the questions to a FormGroup

import { Injectable }   from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { QuestionBase } from '../models/question-base';

@Injectable()
export class QuestionControlService {
  
  constructor() { }

  toFormGroup(questions: QuestionBase<any>[] ) {
    let group: any = {};

    questions.forEach(question => {
      let value = question.value || '';
      let validators = [];

      if(question.readonly){
        value = {value: question.value, disabled: true};
      }

      if(question.required){
        validators.push(Validators.required);
      }
  
      if(validators.length != 0){
        group[question.key] = new FormControl(value, validators);
      }
      else{
        group[question.key] = new FormControl(value);
      }
    });
    return new FormGroup(group);
  }
  
}