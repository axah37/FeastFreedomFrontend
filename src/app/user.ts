export class User {

  private _userId: number;
  public get userId(): number {
    return this._userId;
  }
  public set userId(value: number) {
    this._userId = value;
  }

  private _userFirstName;
  public get userFirstName() {
    return this._userFirstName;
  }
  public set userFirstName(value) {
    this._userFirstName = value;
  }

  private _userLastName;
  public get userLastName() {
    return this._userLastName;
  }
  public set userLastName(value) {
    this._userLastName = value;
  }

  private _userEmail;
  public get userEmail() {
    return this._userEmail;
  }
  public set userEmail(value) {
    this._userEmail = value;
  }

  constructor(_userFirstName, _userLastName, _userEmail){
    this._userFirstName = _userFirstName;
    this._userLastName = _userLastName;
    this._userEmail = _userEmail;
  }
}
