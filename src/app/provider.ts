export class Provider {

  private _providerId: number;
  public get providerId(): number {
    return this._providerId;
  }
  public set providerId(value: number) {
    this._providerId = value;
  }

  private _provderName: string;
  public get provderName(): string {
    return this._provderName;
  }
  public set provderName(value: string) {
    this._provderName = value;
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

  constructor(_providerName:string,_providerEmail:string,_providerPassword:string){
    this._provderName=_providerName;
    this._providerEmail=_providerEmail;
    this._providerPassword=_providerPassword;
  }



}
