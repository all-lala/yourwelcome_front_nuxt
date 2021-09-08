import { inject, singleton } from "tsyringe";
import UserInterface from "~/models/user/user.interface";
import { DependencyInjectionEnum } from "~/plugins/dependencie-injection.enum";
import LocalStorageManager from "~/services/manager/localstorage.manager";
import LoginPassAuthInterface, { ConnectionStatus } from "./login.pass.auth.interface";

@singleton()
export default class LoginPassAuthLocalStorage implements LoginPassAuthInterface {

  private _status: ConnectionStatus = ConnectionStatus.DISCONNECTED

  private _user?: UserInterface

  public static readonly TABLE_NAME: string = 'user'
  public static readonly PRIMARY_FIELD : string = 'id'
  public static readonly LOGIN_FIELD : string = 'login'

  public DEBUG = false

  constructor(
      @inject(DependencyInjectionEnum.LocalStorageManager) private localStorageManager: LocalStorageManager) {}

  public get user(): UserInterface | undefined {
    return this._user
  }

  public set user(user: UserInterface | undefined) {
    this._user = user
  }

  public get status(): ConnectionStatus {
    return this._status
  }

  private setStatusInProgress() {
    this._status = ConnectionStatus.IN_PROGRESS
    this.dispatchStatusChange()
  }

  private setStatusConnected() {
    this._status = ConnectionStatus.CONNECTED
    this.dispatchStatusChange()
  }

  private setStatusDisconnected() {
    this._status = ConnectionStatus.DISCONNECTED
    this.dispatchStatusChange()
  }

  public onStatusChange(status: ConnectionStatus): void {
    if(this.DEBUG) {
      console.log("Conection status", status)
    }
  }

  private dispatchStatusChange() {
    this.onStatusChange(this.status)
  }
  
  connect(login: string, password: string): Promise<boolean> {
    this.setStatusInProgress()
    return this.localStorageManager.find<UserInterface>(LoginPassAuthLocalStorage.TABLE_NAME, LoginPassAuthLocalStorage.LOGIN_FIELD, login).then(user => {
      if (password && user?.password === password) {
        this.user = user
        this.setStatusConnected()
        return true
      } else {
        this.setStatusDisconnected()
        Promise.reject(Error('Mauvais couple login/pass'))
        return false
      }
    })
  }

  disconnect(): Promise<boolean> {
    this.user = undefined
    this.setStatusDisconnected()
    return Promise.resolve(true)
  }
}