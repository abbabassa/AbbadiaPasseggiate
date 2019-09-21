export function getLocaleForAPI(fullLocaleID : string) : string
{
    if(fullLocaleID)
    {
        let splitted = fullLocaleID.split("-");
        if(splitted.length>0)
        {
            return splitted[0];
        }
    }
}