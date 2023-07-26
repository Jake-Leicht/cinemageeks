import { useState, useEffect } from "react";
import { TransactionsInterface } from "../utils/InterfaceHandler";

import "../styles/receipt.scss";

interface Props{
    transaction?: TransactionsInterface;
}

const Receipt = ({transaction} : Props) => {
    const {dateOrdered} = transaction || {};

    const [total, setTotal] = useState<number>(0);

    useEffect(() => {
        setTotal(0); // * Clears total on change
        let history: any = JSON.parse(transaction?.transaction);
        if(history !== 0){
            history.forEach((elem: any) => {
                let temp: number = elem.cost * elem.quantity;
                setTotal((prev) => prev + temp);
            });
        }
    }, []);

    return(<>
        <div className="receipt-wrapper">
            <header>
                <h1>Thank you for your business</h1>
                <h3>Your order:</h3>
                <p>{dateOrdered?.toLocaleDateString()}</p>
            </header>
            <main>
                <ul>
                    {JSON.parse(transaction?.transaction).map((elem: any, index: number) => {
                        return(<>
                            <li key={index}>
                                <div>{elem.purchase.movie.title}</div>
                                <div>${elem.cost * elem.quantity}.00</div>
                            </li>
                        </>);
                    })}
                    <li>
                        <div>total:</div>
                        <div>${total}.00</div>
                    </li>
                </ul>
            </main>
            <footer>
                <h1>Thank you for shopping with us, tell your friends and come back at any time</h1>
            </footer>
        </div>
    </>);
}

export default Receipt;