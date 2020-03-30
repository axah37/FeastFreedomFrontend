import { Provider } from './provider';

export class Item {
  private _itemId: number;
  private _provider: Provider;
  private _itemName: string;
  private _vegetarian: boolean;
  private _itemPrice: number;
  private _addToCart: boolean;
  public get addToCart(): boolean {
    return this._addToCart;
  }
  public set addToCart(value: boolean) {
    this._addToCart = value;
  }


  constructor(_vegetarian=false,_itemName?:string,_itemPrice?:number, addToCart=false){
    this._itemName=_itemName;
    this._vegetarian=_vegetarian;
    this._itemPrice=_itemPrice;
  }

  public get itemName(): string {
    return this._itemName;
  }
  public set itemName(value: string) {
    this._itemName = value;
  }

  public get vegetarian(): boolean {
    return this._vegetarian;
  }
  public set vegetarian(value: boolean) {
    this._vegetarian = value;
  }

  public get itemPrice(): number {
    return this._itemPrice;
  }
  public set itemPrice(value: number) {
    this._itemPrice = value;
  }
  public get itemId(): number {
    return this._itemId;
  }
  public set itemId(value: number) {
    this._itemId = value;
  }
  public get provider(): Provider {
    return this._provider;
  }
  public set provider(value: Provider) {
    this._provider = value;
  }
}
