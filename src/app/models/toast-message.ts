export class ToastMessage {
  date: Date;
  type: string;
  content: string;
  style: string;
  $id?: string;

  constructor(type, date, content, style, id?) {
    this.type = type;
    this.date = date;
    this.content = content;
    this.style = style;
    if(id) this.$id = id;
  }
}
