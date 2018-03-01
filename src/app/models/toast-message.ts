export class ToastMessage {
  date: Date;
  type: string;
  content: string;
  style: string;
  canNotBeDismissed: boolean;
  $id?: string;

  constructor(type:string, date:Date, content:string, style:string, canNotBeDismissed:boolean, id?:string) {
    console.log('mesage created!');
    console.log('canNotBeDismissed', canNotBeDismissed);
    this.type = type;
    this.date = date;
    this.content = content;
    this.style = style;
    this.canNotBeDismissed = canNotBeDismissed;
    if(id) this.$id = id;
  }
}
