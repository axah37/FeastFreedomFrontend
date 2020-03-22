import { Provider } from './provider';

export class Hour {
  private _hourId: number;
  private _provider: Provider;
  private _dayOfWeek:number;
  private _open:boolean;
  private _start:number;
  private _end:number;

  constructor(_dayOfWeek:number, _open:boolean){
    this._dayOfWeek=_dayOfWeek;
    this._open=_open;
  }

  get dayOfWeek():number{return this._dayOfWeek;}
  set dayOfWeek(_dayOfWeek:number){this._dayOfWeek=_dayOfWeek;}

  get open():boolean{return this._open;}
  set open(_open:boolean){this._open=_open;}

  get start():number{return this._start;}
  set start(_start:number){this._start=_start;}

  get end():number{return this._end;}
  set end(_end:number){this._end=_end;}

  public get hourId(): number {
    return this._hourId;
  }
  public set hourId(value: number) {
    this._hourId = value;
  }

  public get provider(): Provider {
    return this._provider;
  }
  public set provider(value: Provider) {
    this._provider = value;
  }
}
