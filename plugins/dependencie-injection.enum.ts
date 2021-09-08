import "reflect-metadata"
import { container, instanceCachingFactory } from "tsyringe";
import Invite from "~/models/invite/invite";
import InviteInterface from "~/models/invite/invite.interface";
import Table from "~/models/table/table";
import TableInterface from "~/models/table/table.interface";
import LocalStorageManager from "~/services/manager/localstorage.manager";
import InviteProviderInterface from "~/services/providers/invite/invite.provider.interface";
import InviteProviderLocalStorage from "~/services/providers/invite/invite.provider.local";

export enum DependencyInjectionEnum {
    Invite = 'Invite',
    Table = 'Table',
    LocalStorageManager = 'LocalStorageManager',
    InviteProvider = 'InviteProvider',
    TableProvider = 'TableProvider',
    InvitePersister = 'InvitePersister',
    TablePersister = 'TablePersister',
    LoginPassAuthProvider = 'LoginPassAuthProvider',
    UserProvider = 'UserProvider',
}