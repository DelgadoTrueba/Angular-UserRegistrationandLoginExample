import { Component, Input } from '@angular/core';
import { FormGroup }        from '@angular/forms';
 
import { QuestionBase }     from '../models/question-base';
 
@Component({
  selector: 'app-question',
  styleUrls: ['./dynamic-form-question.component.scss'],
  templateUrl: './dynamic-form-question.component.html'
})
export class DynamicFormQuestionComponent {
  @Input() question: QuestionBase<any>;
  @Input() form: FormGroup;

  isRequired(): boolean{
    return this.form.controls[this.question.key].errors && this.form.controls[this.question.key].errors.required;
  }
}