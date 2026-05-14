import Left from "./Left";
import Right from "./Right";

const Navbar = () => {
    return (
        <div className="px-6 py-4 flex justify-between w-full">
            <Left />
            <Right />
        </div>
    );
}

export default Navbar;