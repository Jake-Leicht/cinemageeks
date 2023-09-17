import {useState, useEffect} from "react";
import Navbar from "./Navbar";
import {Receipt, Cart} from "../components/ComponentHandler";
import { Tabs, TabList, Tab, TabPanels, TabPanel } from "@chakra-ui/react";
import { collection, onSnapshot, query, where, orderBy} from "firebase/firestore";
import { auth, db } from "../utils/FirebaseConfig";
import { TransactionsInterface } from "../utils/InterfaceHandler";
import { useNavigate } from "react-router-dom";

import "../styles/userDashboard.scss";
import "../styles/cart.scss";

const UserDashboard = () => {
    const user: any = auth.currentUser;
    const firebaseCollection = collection(db, "users");

    const [transactions, setTransactions] = useState<TransactionsInterface[]>([]);

    const navigate: any = useNavigate();

    function displayUserInfo(){
        if(user !== null){
            return(<>
                <ul className="user-info-wrapper">
                    {user.photoURL ? <><li>
                        <img src={user.photoURL} alt="Profile Photo"/></li></> : <></>}
                    {user.displayName ? <><li>Display name: {user.displayName}</li></> : <></>}
                    {user.email ? <><li>Email: {user.email}</li></> : <></>}
                    {/* {user.photoURL ? <><li>photo: {user.photoURL}</li></> : <></>} */}
                </ul>
            </>);
        } else{
            return navigate("/");
        }
    }

    useEffect(() => {
        try {
            displayUserInfo();
            getTransactionData();
        } catch (err) {
            // todo: work on here
            console.log(err);
            return navigate("/");
        }
    }, []);

    const getTransactionData = () => {
        console.log("TRANSACTION CALLED");
        const transactionsQuery = query(firebaseCollection, where("userEmail", "==", user.email), orderBy("dateOrdered"));
        const postTransactions = onSnapshot(transactionsQuery, (snapshot: any) => {
            let tempHolder: any = [];
            snapshot.forEach((doc: any) => {
                let temp: any = doc.data();
                tempHolder.push({id: doc.id, userEmail: temp.userEmail, dateOrdered: temp.dateOrdered.toDate(),
                    transaction: temp.transaction});
            });
            setTransactions(tempHolder);
        });
    }

    // ^ Cart & Handlers
	const [showCart, setShowCart] = useState<boolean>(false);
	const cartHandler = () => {
		showCart ? setShowCart(false) : setShowCart(true);
	};

    const [bgColor, setBgColor] = useState<string>("transparent");
    
    return(<>
        <Navbar cartHandler={cartHandler} onDashboard={true} bgColor={bgColor}/>
        <Tabs className="tabs">
            <TabList className="tabs-list">
                <Tab>Account</Tab>
                <Tab>History</Tab>
                <Tab>Settings</Tab>
            </TabList>

            <TabPanels className="tabs-panels">
                <TabPanel>
                    <h1>Account Info</h1>
                    {displayUserInfo()}
                </TabPanel>
                <TabPanel>
                    <h1>Receipts</h1>
                    <div className="receipt-container">
                        {transactions.length === 0 ? <>
                            <h1>There are no transactions to record</h1>
                        </> : <>
                            {transactions.map((transaction: TransactionsInterface, index: number) => {
                                return(<Receipt key={index} transaction={transaction}/>);
                            })}
                        </>}
                    </div>
                </TabPanel>
                <TabPanel>
                    {/* <p>Settings: light/dark mode, background color for user icon, color blind mode?, etc.</p> */}
                    {/* <h1>Set user-icon background-color:</h1>
                    <ul className="color-selection-wrapper">
                        <li><button title="red" onClick={() => setBgColor("red")}>Text</button></li>
                        <li><button title="blue" onClick={() => setBgColor("blue")}>Text</button></li>
                        <li><button title="lime" onClick={() => setBgColor("lime")}>Text</button></li>
                    </ul> */}
                    <h1>Coming Soon...</h1>
                </TabPanel>
            </TabPanels>
        </Tabs>
        <div className={showCart ? "cart-page-wrapper cart-page-dashboard cart-page-show" : "cart-page-wrapper cart-page-dashboard"}>
            <Cart
                cartHandler={cartHandler}/>
        </div>
    </>);
}

export default UserDashboard;