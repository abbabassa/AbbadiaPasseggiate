export class MenuTree<T>
{
    private _value: T;
    public get value (): T
    {
        return this._value;
    }

    private _children : T[];
    public get children() : T[]
    {
        // returns a copy
        return this._children.map(c=>c);
    }

    public constructor(value:T, children?: T[])
    {
        this._value = value;
        if(children)
            this._children  = children
        else
            this._children  = [];
        

    }

}



