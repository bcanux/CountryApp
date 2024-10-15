import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { debounceTime, Subject, Subscription } from 'rxjs';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
  styles: ``
})
export class SearchBoxComponent implements OnInit,OnDestroy {


  private debouncer:Subject<string> = new Subject();
  private deobuncerSubscription?: Subscription;

  @Input()
  public placeholder:string = '';

  @Output()
  public onValue = new EventEmitter<string>();

  @Output()
  public onDebounce = new EventEmitter<string>();

  @Input()
  public initialValue:string = '';

  ngOnInit(): void{
    this.deobuncerSubscription = this.debouncer
    .pipe(
      debounceTime(500)
    )
    .subscribe(value =>{
      //console.log('debouncer value', value)
      this.onDebounce.emit(value);
    });
  }

  ngOnDestroy(): void {
    this.deobuncerSubscription?.unsubscribe();
  }

  emitValue(value: string):void{
     this.onValue.emit(value);
  }

  onKeyPress(searchTerm: string){
    //console.log(searchTerm);
    this.debouncer.next(searchTerm);
  }
}
