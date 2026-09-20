

export const TitleSection = ({ partOne, partTwo }) => {
    return (
        <h2 className="font-bold text-xl">
            <span className="text-primary">{partOne}</span>
            <span className="text-secondary">{partTwo}</span>
        </h2>
    )
}
