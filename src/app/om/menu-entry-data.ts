export class MenuEntryData
{
    public constructor(
        public readonly defName:string,
        public readonly translKey: string,
        public readonly routerLink: string,
        private _status: MenuEntryStatus,
    ){}

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
    Default,
    Active,
    Disable
}
