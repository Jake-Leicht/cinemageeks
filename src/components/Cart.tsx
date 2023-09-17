import {useState, useEffect} from "react";
import {CartItem} from "./ComponentHandler";
import { PurchaseInterface } from "../utils/InterfaceHandler";
import { addDoc, collection } from "firebase/firestore";
import { Timestamp } from "firebase/firestore";
import { db, auth } from "../utils/FirebaseConfig";
// import { stockData } from "../utils/StockData";
import { FormControl, FormLabel, Input, NumberInput, 
    NumberInputField, NumberInputStepper, 
    NumberIncrementStepper, NumberDecrementStepper} from "@chakra-ui/react";

import "../styles/cart.scss";

interface Props{
    cartHandler: () => void;
    clearPurchase?: () => void;
    purchase?: PurchaseInterface;
}

const Cart = ({purchase, cartHandler, clearPurchase}: Props) => {
    const user: any = auth.currentUser;

    const [cart, setCart] = useState<any>([]);
    const [total, setTotal] = useState<number>(0);

    const [purchaseSuccess, setPurchaseSuccess] = useState<boolean>(false);

    useEffect(() => {
        if(purchase?.movie?.title.toLowerCase() !== undefined){
            cartItemHandler(purchase);
        }
    }, [purchase]);

    useEffect(() => {
        getTotal(cart);
    }, [cart]);

    const cartItemHandler = (item: PurchaseInterface) => {
        let id: number = getID();

        setCart([...cart, {
            id: id,
            key: id,
            purchase: purchase,
        }]);
        if(clearPurchase !== undefined){
            clearPurchase();
        }
    }

    const getID = () => {
        return Math.random() * 1000;
    }

    const getTotal = (cart: any) => {
        let totalTemp: number = 0;
        cart.forEach((item: any) => {
            totalTemp += item.purchase.cost * item.purchase.quantity;
        });
        setTotal(totalTemp);
    }

    const removeItem = (removeThisIndex: number) => {
        let result: any = cart;
        result = cart.filter((_: any, key: any) => {
            return key !== removeThisIndex;
        });
        setCart(result);
    }

    const itemQuantityHandler = (alterThisIndex: number, method: string) => {
        let cartPlaceHolder: any = [];
        cart.forEach((elem: any, index: number) => {
            let {purchase} = elem;  // * Deconstruct purchase
            if(index === alterThisIndex){
                switch(method){
                    case "add":
                        let newAddPurchase: any = {...purchase, quantity: elem.purchase.quantity + 1}
                        let newAdd: any = {...elem, purchase: newAddPurchase}
                        cartPlaceHolder.push(newAdd);
                        break;
                    case "subtract":
                        if(elem.purchase.quantity > 1){
                            let newSubPurchase: any = {...purchase, quantity: elem.purchase.quantity - 1};
                            let newSub: any = {...elem, purchase: newSubPurchase}
                            cartPlaceHolder.push(newSub);
                            break;
                        } else{
                            cartPlaceHolder.push(elem);
                            break;
                        }
                }
            } else{
                cartPlaceHolder.push(elem);
            }
        });
        setCart(cartPlaceHolder);
    }

    // const populateWithStockData = () => {
    //     setCart(stockData);
    // }

    const firebaseCollection = collection(db, "users");

    const submitPurchase = async (cart: any) => {
        const user: any = auth.currentUser;
        let date: Date = new Date();
        try{
            await addDoc(firebaseCollection, {
                userEmail: user.email,
                transaction: JSON.stringify(cart),
                dateOrdered: Timestamp.fromDate(date)
            });
            console.log("SUBMISSION SUCCESSFUL");
            setPurchaseSuccess(true);
        } catch{
            console.log("SUBMISSION FAILED");
            setPurchaseSuccess(false);
        }
    }

    const [checkoutProcess, setCheckoutProcess] = useState<number>(1);

    const cartDisplay = () => {
        return(<>
            {cart.length === 0 ? <>
                <div className="cart-null-wrapper">
                    <img src={require("../images/emptyCart.png")} alt="Empty Cart" />
                    <h1>You have no items in your cart, continue shopping</h1>
                </div>
            </> : <>
                <div className="cart-items-container">
                    {cart.map((item: any, index: number) => <CartItem index={index} key={index} id={item.id} 
                    item={item} removeItem={removeItem} itemQuantityHandler={itemQuantityHandler}/>)}
                </div>
                <div className="cart-footer">
                    <div className="cart-btn-wrapper">
                        {/* <button onClick={populateWithStockData}>Stock Data</button> */}
                        <button className="cart-clear-btn" onClick={() => setCart([])}>Clear Cart</button>
                        <button className="cart-checkout-btn" onClick={() => setCheckoutProcess(2)}>Proceed to Shipping</button>
                    </div>
                    <div>
                        <span>Total:</span>
                        <span>${total}.00</span>
                    </div>
                </div>
            </>}
        </>);
    }

    const shippingDisplay = () => {
        return(<>
            <div className="cart-shipping-wrapper">
                <FormControl isRequired>
                    <FormLabel>Full name</FormLabel>
                    <Input placeholder='Ex. John Doe' />
                </FormControl>
                <FormControl isRequired>
                    <FormLabel>Address</FormLabel>
                    <Input placeholder='Ex. 123 N. 45th st' />
                </FormControl>
                <FormControl isRequired>
                    <FormLabel>City</FormLabel>
                    <Input placeholder='Ex. New York' />
                </FormControl>
                <FormControl isRequired>
                    <FormLabel>State</FormLabel>
                    <Input placeholder='Ex. NY' />
                </FormControl>
                <FormControl isRequired>
                    <FormLabel>Zip code</FormLabel>
                    <Input placeholder='Ex. 12345' />
                </FormControl>
            </div>
            <div className="cart-btn-wrapper">
                <button className="cart-clear-btn" onClick={() => setCheckoutProcess(1)}>Go Back</button>
                <button className="cart-checkout-btn" onClick={() => setCheckoutProcess(3)}>Proceed to Payment</button>
            </div>
        </>);
    }

    const paymentDisplay = () => {
        return(<>
            <div className="payment-display-wrapper">
                <FormControl isRequired>
                    <FormLabel>Name on Card</FormLabel>
                    <Input placeholder='Ex. John Doe' />
                </FormControl>
                <FormControl isRequired>
                    <FormLabel>Card Number</FormLabel>
                    <Input placeholder='Ex. 1111-2222-3333-4444' />
                </FormControl>
                <FormControl isRequired>
                    <FormLabel>Expiration Year</FormLabel>
                    <NumberInput defaultValue={2023}>
                        <NumberInputField />
                        <NumberInputStepper>
                            <NumberIncrementStepper />
                            <NumberDecrementStepper />
                        </NumberInputStepper>
                    </NumberInput>
                </FormControl>
                <FormControl isRequired>
                    <FormLabel>Expiration Month</FormLabel>
                    <NumberInput defaultValue={1} min={1} max={12}>
                        <NumberInputField />
                        <NumberInputStepper>
                            <NumberIncrementStepper />
                            <NumberDecrementStepper />
                        </NumberInputStepper>
                    </NumberInput>
                </FormControl>
                <FormControl isRequired>
                    <FormLabel>CVV</FormLabel>
                    <Input placeholder='Ex. 001' />
                </FormControl>
            </div>
            <div className="cart-btn-wrapper">
                <button className="cart-clear-btn" onClick={() => setCheckoutProcess(2)}>Go Back</button>
                <button className="cart-checkout-btn" onClick={() => setCheckoutProcess(4)}>Proceed to Review</button>
            </div>
        </>);
    }

    const reviewDisplay = () => {
        return(<>
            <h3><span className="highlight">Warning: </span> Do not include any real info during this checkout process. 
            <span className="highlight"> No actual purchases </span> are being made during this process. No personal information; 
            address or payment, is being collected or stored. Only the email used to login, and the items you "purchased" or stored to 
            create a purchase history for the user.</h3>
            <div className="cart-btn-wrapper">
                <button className="cart-clear-btn" onClick={() => setCheckoutProcess(2)}>Go Back</button>
                <button className="cart-submit-purchase-btn" onClick={() => {
                    submitPurchase(cart);
                    setCheckoutProcess(5);
                }}>Submit Purchase</button>
            </div>
        </>);
    }

    const completePurchaseDisplay = () => {
        setTimeout(() => {
            setCheckoutProcess(1);
            setCart([]);
        }, 6000);

        return(<>
            <div className="complete-purchase-wrapper">
                {purchaseSuccess ? <>
                    <img src={require("../images/confirm.png")} alt="Purchase Complete" />
                    <h3>Your purchase was a success!</h3>
                </> : <>
                    <img src={require("../images/error.png")} alt="Error" />
                    <h3>There was an error with your purchase, try again later</h3>
                </>}
            </div>
        </>);
    }

    return(<>
        <ul className="cart-breadcrumb-wrapper">
            <li className={checkoutProcess >= 1 ? "active" : ""}>Cart</li>
            <li> / </li>
            <li className={checkoutProcess >= 2 ? "active" : ""}>Shipping</li>
            <li> / </li>
            <li className={checkoutProcess >= 3 ? "active" : ""}>Payment</li>
            <li> / </li>
            <li className={checkoutProcess >= 4 ? "active" : ""}>Review</li>
            <li> / </li>
            <li className={checkoutProcess >= 5 ? "active" : ""}>Complete</li>
        </ul>
        <div className="cart-header-wrapper">
            <h1>{user !== null ? <>{user.email}'s Cart ({cart.length})</> : <>Your Shopping Cart ({cart.length})</>}</h1>
            <button title="close cart" onClick={() => {
                cartHandler();
                setCheckoutProcess(1);
            }}>Close</button>
        </div>
        {checkoutProcess === 1 ? <>{cartDisplay()}</> : <></>}
        {checkoutProcess === 2 ? <>{shippingDisplay()}</> : <></>}
        {checkoutProcess === 3 ? <>{paymentDisplay()}</> : <></>}
        {checkoutProcess === 4 ? <>{reviewDisplay()}</> : <></>}
        {checkoutProcess === 5 ? <>{completePurchaseDisplay()}</> : <></>}
    </>);
}

export default Cart;