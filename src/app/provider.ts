export class Provider {

  private _providerId: number;
  public get providerId(): number {
    return this._providerId;
  }
  public set providerId(value: number) {
    this._providerId = value;
  }

  private _providerName: string;
  public get providerName(): string {
    return this._providerName;
  }
  public set providerName(value: string) {
    this._providerName = value;
  }

  private _providerEmail: string;
  public get providerEmail(): string {
    return this._providerEmail;
  }
  public set providerEmail(value: string) {
    this._providerEmail = value;
  }

  private _providerPassword: string;
  public get providerPassword(): string {
    return this._providerPassword;
  }
  public set providerPassword(value: string) {
    this._providerPassword = value;
  }

  private _providerImg;
  public get providerImg() {
    return this._providerImg;
  }
  public set providerImg(value) {
    this._providerImg = value;
  }
  constructor(_providerName:string,_providerEmail:string,_providerPassword:string){
    this._providerName=_providerName;
    this._providerEmail=_providerEmail;
    this._providerPassword=_providerPassword;
  }



}
