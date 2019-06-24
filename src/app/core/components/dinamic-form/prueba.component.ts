import { Component }       from '@angular/core';
 
import { QuestionService } from './question.service';
 
@Component({
  selector: 'app-prueba',
  template: `
    <div>
      <app-dynamic-form [questions]="questions"></app-dynamic-form>
    </div>
  `,
  providers:  [QuestionService]
})
export class PruebaComponent {
  questions: any[];
 
  constructor(service: QuestionService) {
    this.questions = service.getQuestions();
  }
}