import { useState, useEffect } from "react";
import { TransactionsInterface } from "../utils/InterfaceHandler";

import "../styles/receipt.scss";

interface Props{
    transaction: TransactionsInterface;
    key: number;
}

const Receipt = ({transaction} : Props) => {
    const {dateOrdered} = transaction || {};

    const [total, setTotal] = useState<number>(0);

    useEffect(() => {
        setTotal(0); // * Clears total on change
        let history: any = JSON.parse(transaction?.transaction);
        if(history !== 0){
            history.forEach((elem: any) => {
                let temp: number = elem.purchase.cost * elem.purchase.quantity;
                setTotal((prev) => prev + temp);
            });
        }
    }, []);

    return(<>
        <div className="receipt-wrapper">
            <header>
                <h2>Thank you for your business</h2>
                <p>Ordered on: {dateOrdered?.toLocaleDateString()}</p>
            </header>
            <main>
                <ul>
                    {JSON.parse(transaction?.transaction).map((elem: any, index: number) => {
                        return(<>
                            <li key={index}>
                                <div>{elem.purchase.movie.title}</div>
                                <div>${elem.purchase.cost * elem.purchase.cost}.00</div>
                            </li>
                        </>);
                    })}
                    <li key="last">
                        <div>total:</div>
                        <div>${total}.00</div>
                    </li>
                </ul>
            </main>
            <footer>
                <h4>Thank you for shopping with us, tell your friends and come back at any time</h4>
            </footer>
        </div>
    </>);
}

export default Receipt;