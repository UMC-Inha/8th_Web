import { FaShoppingCart } from "react-icons/fa"
import { useEffect } from "react"
import { useCartActions, useCartInfo } from "../hooks/useCartStore"

const Navbar = () => {
    const { amount, cartItems } = useCartInfo()
    const { calculateTotals } = useCartActions()

    // const { amount, cartItems } = useSelector((state) : CartState => state.cart)
    // const dispatch = useDispatch()

    useEffect(() => {
        calculateTotals()
    }, [cartItems, calculateTotals])

    return (
        <div className="flex justify-between items-center p-4 bg-gray-800 text-white">
            <h1 
                onClick={() => {
                window.location.href = '/'
            }} 
                className="text-2xl font-semibold cursor-pointer">
                    Judy</h1>
            <div className="flex items-center space-x-2">
                <FaShoppingCart className="text-2xl" />
                <span className="text-xl font-medium">{amount}</span>
            </div>
        </div>
    )
}

export default Navbar