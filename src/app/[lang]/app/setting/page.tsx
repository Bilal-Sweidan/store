
import SettingHeader from "@/components/public/layout/headers/SettingHeader";
import Image from "next/image";

// image 
import image from "@/../public/1_pwZg281-0m4d4TmApYviQg.jpg"
// icons
import SettingsClient from "@/components/public/layout/SettingsClient";
export default function Setting() {
    return (
        <>
            <SettingHeader />
            <section>
                <div>
                    <Image src={image} alt="profile" width="150" className="m-auto mt-4 rounded-full h-[150]" />
                </div>
                <SettingsClient />
            </section>
        </>
    )
}