export class Sidebar {
  key: string;
  title: string;
  link: string;
  tag: number;
  ifSub: boolean;
  active: boolean;
  open: boolean;
  subBars: Sidebar[];

  constructor(obj ? : any) {
    this.key = obj.key || '';
    this.title = obj.title || '';
    this.link = obj.link || '';
    this.tag = obj.tag || null;
    this.open = !!obj.open;
    this.ifSub = !!obj.ifSub;
    this.subBars = obj.subBars || [];
  }
}
