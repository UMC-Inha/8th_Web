import { FaShoppingCart } from "react-icons/fa"
import { useSelector } from "../hooks/useCustomRedux"

const Navbar = () => {
    const { total } = useSelector((state) => state.cart)
    return (
        <div className="flex justify-between items-center p-4 bg-gray-800 text-white">
            <h1 className="text-2xl font-semibold">Judy</h1>
            <div className="flex items-center space-x-2">
                <FaShoppingCart className="text-2xl" />
                <span className="text-xl font-medium">{total}</span>
            </div>
        </div>
    )
}

export default Navbar