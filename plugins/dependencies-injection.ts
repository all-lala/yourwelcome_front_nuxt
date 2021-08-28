import "reflect-metadata"
import { Plugin } from '@nuxt/types'
import { container, DependencyContainer, instanceCachingFactory } from "tsyringe";
import Invite from "../models/invite/invite";
import InviteInterface from "../models/invite/invite.interface";
import Table from "../models/table/table";
import TableInterface from "../models/table/table.interface";
import LocalStorageManager from "../services/manager/localstorage.manager";
import InvitePersisterInterface from "../services/persisters/invite/invite.persister.interface";
import InvitePersisterLocalStorage from "../services/persisters/invite/invite.persister.local";
import TablePersisterInterface from "../services/persisters/table/table.persister.interface";
import TablePersisterLocalStorage from "../services/persisters/table/table.persister.local";
import InviteProviderInterface from "../services/providers/invite/invite.provider.interface";
import InviteProviderLocalStorage from "../services/providers/invite/invite.provider.local";
import TableProviderInterface from "../services/providers/table/table.provider.interface";
import TableProviderLocalStorage from "../services/providers/table/table.provider.local";
import { DependencyInjectionEnum } from "./dependencie-injection.enum";

export default function dependencyInjection()
{
    const BACKEND_TYPE_LOCALSTORAGE = 'LocalStorage'
    
    const backendType: string = process.env.backendType ?? BACKEND_TYPE_LOCALSTORAGE

    setDefinitions()

    /**
     * Définition spécifiques
     */
    function setDefinitions() {
        setGlobalDefinitions()
        setSpecialDefinitions()
    }
    
    /**
     * Définitions globales
     */
    function setGlobalDefinitions() {
        container.register<InviteInterface>(DependencyInjectionEnum.Invite, { useClass: Invite })
        container.register<TableInterface>(DependencyInjectionEnum.Table, { useClass: Table })
    }
    
    /**
     * Définitions particulière à l'env
     */
    function setSpecialDefinitions() {
        switch(backendType) {
            case BACKEND_TYPE_LOCALSTORAGE:
                container.register<LocalStorageManager>(DependencyInjectionEnum.LocalStorageManager, { useFactory: instanceCachingFactory<LocalStorageManager>(c => c.resolve(LocalStorageManager)) })
                container.register<InviteProviderInterface>(DependencyInjectionEnum.InviteProvider, { useFactory: instanceCachingFactory<InviteProviderInterface>(c => c.resolve(InviteProviderLocalStorage)) })
                container.register<InvitePersisterInterface>(DependencyInjectionEnum.InvitePersister, { useFactory: instanceCachingFactory<InvitePersisterInterface>(c => c.resolve(InvitePersisterLocalStorage)) })
                container.register<TableProviderInterface>(DependencyInjectionEnum.TableProvider, { useFactory: instanceCachingFactory<TableProviderInterface>(c => c.resolve(TableProviderLocalStorage)) })
                container.register<TablePersisterInterface>(DependencyInjectionEnum.TablePersister, { useFactory: instanceCachingFactory<TablePersisterInterface>(c => c.resolve(TablePersisterLocalStorage)) })
                break
            }
        }

    return container
}

dependencyInjection()
