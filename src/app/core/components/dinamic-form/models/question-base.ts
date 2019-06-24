export class QuestionBase<T> {

    controlType: string;
    key: string;
    label: string;
    value: T;
    order: number;
    required: boolean;
    readonly: boolean;
   
    constructor(
        options: {
          controlType?: string
          key?: string,
          label?: string,
          value?: T,
          order?: number,
          required?: boolean,
          readonly?: boolean,
        } = {}
    ){
      this.controlType = options.controlType || '';
      this.key = options.key || '';
      this.label = options.label || '';
      this.value = options.value;
      this.order = options.order === undefined ? 1 : options.order;
      this.required = !!options.required;
      this.readonly = options.readonly === undefined ? false : options.readonly;
    }
  }