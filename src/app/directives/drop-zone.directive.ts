import {Directive, HostListener, EventEmitter, Output} from '@angular/core';

@Directive({
  selector: '[dropZone]'
})
export class DropZoneDirective {

  @Output() dropped = new EventEmitter<FileList>();
  @Output() hovered = new EventEmitter<boolean>();

  constructor() { }

  @HostListener('drop', ['$event']) onDrop($event){
    $event.preventDefault();
    this.dropped.emit($event.dataTransfer.files); // TODO: Maybe file? for one file?
    this.hovered.emit(false);
  }
  @HostListener('dragover', ['$event']) onDragOver($event){
    $event.preventDefault();
    this.hovered.emit(true);
  }
  @HostListener('dragleave', ['$event']) onDragLeave($event){
    $event.preventDefault();
    this.hovered.emit(false);
  }

}
