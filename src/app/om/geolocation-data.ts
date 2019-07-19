export class GeolocationData {
    private _previousStatus : GeolocationStatus = GeolocationStatus.Disabled
    private _status: GeolocationStatus =GeolocationStatus.Disabled

    public set status(status:GeolocationStatus)
    {
        this._previousStatus = this._status;
        this._status = status;
    }

    public get status():GeolocationStatus
    {
        return this._status;
    }

    
    public get firstActivation():boolean
    {
        return this._previousStatus == GeolocationStatus.Disabled && this._status != GeolocationStatus.Disabled;
    }

    public confirmStatus()
    {
        this._previousStatus = this._status;
    }
    
    constructor(
        status:GeolocationStatus
    ){
        this.status = status;
    }
}
export enum GeolocationStatus
{
    Disabled = 0,
    Active = 1,
    ActiveWithError =2
}