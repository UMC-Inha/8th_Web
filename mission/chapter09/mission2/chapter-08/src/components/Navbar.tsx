import { FaShoppingCart } from "react-icons/fa"
import { useSelector } from "../hooks/useCustomRedux"
import { calculateTotals, type CartState } from "../slices/cartSlice"
import { useDispatch } from "react-redux"
import { useEffect } from "react"

const Navbar = () => {
    const { amount, cartItems } = useSelector((state) : CartState => state.cart)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(calculateTotals())
    }, [dispatch, cartItems])

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