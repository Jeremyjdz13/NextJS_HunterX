
type LabelProp = {
    storedLabel: string;
}
export default function Label({ storedLabel }: LabelProp){
    const label = storedLabel
    return (
        <div>
            {label}
        </div>
    )
}