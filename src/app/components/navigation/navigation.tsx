import Image from 'next/image'


export default function Navigation() {
    const contents = [
        {
            name: "SAVAGE RAID",
            src: "/bg-savage-raid.jpeg",
            disabled: false,
        },
        {
            name: "NORMAL RAID",
            src: "/bg-normal-raid.jpeg",
            disabled: true,
        },
        {
            name: "ALLIANCE RAID",
            src: "/bg-alliance-raid.jpeg",
            disabled: true,
        },
        {
            name: "4 PLAYER",
            src: "/bg-4player.jpeg",
            disabled: true,
        }
    ]

    return (
        <div className="w-full">
            <div className="grid grid-cols-4 gap-4 w-full">
                {contents.map((content) => (
                    <div key={content.name} className="flex justify-center border rounded-md bg-slate-50 shadow-md text-gray-700 font-semibold relative w-72 h-32">
                        <Image className="shadow-md rounded-md" src={content.src} objectFit="cover" layout="fill" alt="Background Normal Raid" />
                        <div className={`${content.disabled ? "bg-opacity-90":"bg-opacity-20"} relative rounded-md shadow-md flex justify-center items-center w-full bg-slate-700 text-white`}>{content.name}</div>
                    </div>
                ))}
            </div>
        </div>
    )
}