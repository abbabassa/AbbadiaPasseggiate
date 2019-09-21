import { environment } from '../../environments/environment';

export class MenuEntryData
{
    public readonly name: string;
    public constructor(
        defName:string,
        translKey: string,
        public readonly routerLink: string,
        private _status: MenuEntryStatus,
        public readonly isExclusive = true
    )
    {
        if(environment.dynamicTransl && environment.dynamicTransl[translKey])
        {
            this.name = environment.dynamicTransl[translKey];
        }
        else
        {
            this.name = defName;
        }
    }

    public get status():MenuEntryStatus
    {
        return this._status;
    }

    public setActive()
    {        
        this._status = MenuEntryStatus.Active;
    }

    public setDefault()
    {
        this._status = MenuEntryStatus.Default;
    }

}


export enum MenuEntryStatus
{
    Default=0,
    Active=1,
    Disable=-1
}
