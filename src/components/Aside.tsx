import {useState} from "react";
import {FilterWrapper} from "./ComponentHandler";
import { MovieInterface } from "../utils/InterfaceHandler";

import "../styles/aside.scss";

interface Props{
    clearFiltersHandler: () => void;
	applyFiltersHandler: (arg1: string, arg2: string, arg3: string, arg4: boolean) => void;
	availableGenres: MovieInterface[];
}

const Aside = ({clearFiltersHandler, applyFiltersHandler, availableGenres} : Props) => {

    // ^ Aside & Handlers
	const [showAside, setShowAside] = useState<boolean>(false);
	const asideHandler = () => {
		showAside ? setShowAside(false) : setShowAside(true);
	};

    return(<>
        <aside className={showAside ? "aside-wrapper aside-show" : "aside-wrapper"}>
            <div className="hamburger-menu">
                <input
                    type="checkbox"
                    title="filter menu"
                    className="hamburger-checkbox"
                    onClick={asideHandler}/>
                <div className="line line-top"></div>
                <div className="line line-mid"></div>
                <div className="line line-bottom"></div>
            </div>
            <FilterWrapper
                showAside={showAside}
                clearFiltersHandler={clearFiltersHandler}
                applyFiltersHandler={applyFiltersHandler}
                availableGenres={availableGenres}/>
        </aside>
    </>);
    }

export default Aside;