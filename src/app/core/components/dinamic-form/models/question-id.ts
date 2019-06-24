import { QuestionBase } from './question-base';

export class IdQuestion extends QuestionBase<string> {
  controlType = 'id';
  type: string;

  constructor(options: {} = {}) {
    super(options);
    this.type = options['type'] || '';
    this.required = false;
    this.readonly = true;
  }
}