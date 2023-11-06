
type TitleProp = {
    statGroupTitle: string;
}
export default function Title({ statGroupTitle }: TitleProp){
    const title = statGroupTitle
    return (
        <div className="p-1 text-center">
            {title}
        </div>
    )
}