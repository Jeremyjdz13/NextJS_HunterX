
type TitleProp = {
    storedTitle: string;
}
export default function Title({ storedTitle }: TitleProp){
    const title = storedTitle
    return (
        <div>
            {title}
        </div>
    )
}