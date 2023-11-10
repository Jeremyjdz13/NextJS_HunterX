
type LabelProp = {
    storedLabel: string;
}
export default function Label({ storedLabel }: LabelProp){
    const label = storedLabel
    return (
        <div className="border-b border-black p-1">
            {label}
        </div>
    )
}