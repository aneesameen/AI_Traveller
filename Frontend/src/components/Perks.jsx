import { IoCarOutline } from "react-icons/io5";
import { IoWifiSharp } from "react-icons/io5";
import { IoMdTv } from "react-icons/io";
import { PiDog } from "react-icons/pi";
import { TbDoorEnter } from "react-icons/tb";
import { LuHeater } from "react-icons/lu";
import { TbBath } from "react-icons/tb";
import { BiFridge } from "react-icons/bi";

function Perks({ selected, onChange }) {

    const handleboxclick = (ev) => {
        const { checked, name } = ev.target;
        if (checked) {
            onChange([...selected, name]);
        } else {
            onChange([...selected.filter(selectedName => selectedName !== name)]);
        }
    }
    return (
        <>
            <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
                <input type="checkbox" checked={selected.includes("parking")} name="parking" onChange={handleboxclick} />
                <IoCarOutline />
                <span>Free parking</span>
            </label>

            <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
                <input type="checkbox" checked={selected.includes("wifi")} name="wifi" onChange={handleboxclick} />
                <IoWifiSharp />
                <span>Wifi</span>
            </label>

            <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
                <input type="checkbox" checked={selected.includes("tv")} name="tv" onChange={handleboxclick} />
                <IoMdTv />
                <span>TV</span>
            </label>

            <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
                <input type="checkbox" checked={selected.includes("pets")} name="pets" onChange={handleboxclick} />
                <PiDog />
                <span>Pets</span>
            </label>

            <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
                <input type="checkbox" checked={selected.includes("pvtEntrance")} name="pvtEntrance" onChange={handleboxclick} />
                <TbDoorEnter />
                <span>private Entrance</span>
            </label>

            <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
                <input type="checkbox" checked={selected.includes("heating")} name="heating" onChange={handleboxclick} />
                <LuHeater />
                <span>Heating</span>
            </label>

            <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
                <input type="checkbox" checked={selected.includes("bath")} name="bath" onChange={handleboxclick} />
                <TbBath />
                <span>Bath</span>
            </label>

            <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
                <input type="checkbox" checked={selected.includes("storage")} name="storage" onChange={handleboxclick} />
                <BiFridge />
                <span>Storage</span>
            </label>
        </>
    )
}
export default Perks