export class TableTitle {
  name: string;
  key: string;
  frequency:string;
  minwidth: number;
  maxwidth: number;
  controlType: string;
  
  constructor(options: {
    name: string,
    key: string,
    frequency ? :string;
    minwidth ? : number;
    maxwidth ? : number;
    controlType ? : string;
  }) {
    this.name = options && options.name;
    this.key = options && options.key;
    this.frequency = options && options.frequency || null;
    this.minwidth = options && options.minwidth || null;
    this.maxwidth = options && options.maxwidth || null;
    this.controlType = options && options.controlType || 'text';
  }
}
