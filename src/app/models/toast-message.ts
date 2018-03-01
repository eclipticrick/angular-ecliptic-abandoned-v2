export class ToastMessage {
  $id?: string;
  userId?: string;
  date: Date;
  type: string; //local, global, user todo: global later
  content: string;
  style: string;
  dismissed: boolean = false;

  constructor(type, date, content, style?) {
    this.content = content;
    this.style = style || 'info';
  }
}
