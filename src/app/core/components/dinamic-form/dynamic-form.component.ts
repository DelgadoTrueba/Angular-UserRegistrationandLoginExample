import { Component, Input, OnInit, Output, EventEmitter }  from '@angular/core';
import { FormGroup }                 from '@angular/forms';
 
import { QuestionBase }              from './models/question-base';
import { QuestionControlService }    from './services/question-control.service';
 
@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss'],
  providers: [ QuestionControlService ]
})
export class DynamicFormComponent implements OnInit {
 
  @Input() action : string;
  @Input() questions: QuestionBase<any>[] = [];
  form: FormGroup;

  @Output() submitValue = new EventEmitter<any>();
 
  constructor(private qcs: QuestionControlService) {  }
 
  ngOnInit() {
    this.form = this.qcs.toFormGroup(this.questions);
  }
 
  onSubmit() {
    this.submitValue.emit(this.form.value);
  }

  isValid(questionKey) { return this.form.controls[questionKey].valid; }
}