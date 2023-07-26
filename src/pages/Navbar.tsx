import { useState, useRef, useEffect} from "react";
import {Link} from "react-router-dom";

import { Input, InputRightElement, InputGroup } from "@chakra-ui/react";
import { Menu, MenuButton, MenuList, MenuItem, Button, useToast} from "@chakra-ui/react";
import { FaSearch, FaShoppingCart, FaUser, FaChevronDown,} from "react-icons/fa";

import { signOut } from "firebase/auth";
import { auth } from "../utils/FirebaseConfig";

import "../styles/navbar.scss";
import "../styles/cart.scss";

interface Props{
    search?: string;
    setSearch?: any;
    onOpen?: any;
    onClose?: any;
    btnRef?: any;
    bgColor?: string;
    onDashboard?: boolean;
    closeProductPage?: () => void;
    cartHandler?: () => void;
}

const Navbar = ({setSearch, onOpen, btnRef, bgColor, onDashboard, closeProductPage, cartHandler}: Props) => {
    const user: any = auth.currentUser;
    const [userUpdate, setUserUpdate] = useState<boolean>(false);

    // ^ Search input handler
    const searchRef = useRef<string>("");

    const toast = useToast();
    const statuses: any = ['success', 'error', 'warning', 'info'];
    // * sucsess = sucess, warning = error, info = tip (item added to cart), warning = ?

    const signOutUser = () => {
        signOut(auth).then(() => {
            toast({
                title: "Logout Successful",
                position: "top",
                duration: 1500,
                status: "info",
                isClosable: true
            });
            setUserUpdate(true);
        }).catch((error) => {
            toast({
                title: `Logout Error; ${error}`,
                position: "top",
                duration: 1500,
                status: statuses[1],
                isClosable: true
            });
        });
    }

    // ^ Responsiveness
    const [winWidth, setWinWidth] = useState<number>(0);

    const getWindowSize = () => {
        let width = window.innerWidth;
        setWinWidth(width);
    }

    useEffect(() => {
        getWindowSize();

        window.addEventListener("resize", getWindowSize);
        return () => 
            window.removeEventListener("resize", getWindowSize);
    }, []);

    function NavbarMobileView(){
        const style = {background: `${bgColor}`, borderRadius: "4px", boxShadow: `0px 0px 0px 6px ${bgColor}`};
        return(<>
            <nav className="nav-wrapper">
                <Link to="/">
                    <button className="nav-logo" onClick={closeProductPage}>
                        <img className="nav-logo-img"
                            src={require("../images/logo.png")}
                            alt="CinemaGeeks"/>
                        <div className={winWidth <= 768 ? "hide-logo": "nav-logo-txt"}>CinemaGeeks</div>
                    </button>
                </Link>
                <div className="nav-right">
                    <div className="search-box">
                        <button className="btn-search" title="search"><FaSearch/></button>
                        <input className="input-search" type="text" title="search"
                        onChange={(input) => {searchRef.current = input.currentTarget.value}}
                        onKeyDown={(key: any) => {
                            if(key.key === "Enter"){
                                setSearch(searchRef.current);
                            }
                        }}/>
                    </div>
                    <div className="user-icon">
                        <Menu isLazy>
                            {({ isOpen }) => (
                                <>
                                    <MenuButton isActive={isOpen} as={Button} rightIcon={<FaChevronDown />}>
                                        {isOpen ? <FaUser style={style}/> : <FaUser style={style}/>}
                                    </MenuButton>
                                    <MenuList>
                                        {user !== null ? (<>
                                                <MenuItem className="cart-wrapper" title="Cart" onClick={cartHandler}>
                                                    {/* <>
                                                        <button className="cart-wrapper" title="Cart" onClick={cartHandler}>
                                                            <FaShoppingCart/>
                                                        </button>
                                                    </> */}
                                                    <FaShoppingCart/>
                                                </MenuItem>
                                                {onDashboard ? <>
                                                    <Link to="/">
                                                        <MenuItem>Home</MenuItem>
                                                    </Link>
                                                </> : <>
                                                    <Link to="./UserDashboard">
                                                        <MenuItem>Dashboard</MenuItem>
                                                    </Link>
                                                </>}
                                                <Link to="/">
                                                    <MenuItem onClick={signOutUser}>Log Out</MenuItem>
                                                </Link>
                                            </>) : (<>
                                                <MenuItem className="cart-wrapper" title="Cart" onClick={cartHandler}>
                                                    <FaShoppingCart /> 
                                                </MenuItem>
                                                <MenuItem className="user-menu-item" ref={btnRef} onClick={onOpen}>Login</MenuItem>
                                            </>)}
                                    </MenuList>
                                </>)}
                        </Menu>
                    </div>
                </div>
            </nav>
        </>);
    }

    function NavbarView(){
        const style = {background: `${bgColor}`, borderRadius: "4px", boxShadow: `0px 0px 0px 8px ${bgColor}`};
        return(<>
            <nav className="nav-wrapper">
                <Link to="/">
                    <button className="nav-logo" onClick={closeProductPage}>
                        <img className="nav-logo-img"
                            src={require("../images/logo.png")}
                            alt="CinemaGeeks"/>
                        <span className="nav-logo-txt">CinemaGeeks</span>
                    </button>
                </Link>
                <div className="nav-right">
                    <div>
                        <InputGroup>
                            <Input
                                variant="filled"
                                onChange={(input) => {searchRef.current = input.currentTarget.value}}
                                onKeyDown={(key: any) => {
                                    if(key.key === "Enter"){
                                        setSearch(searchRef.current);
                                    }
                                }}
                                placeholder="Search movie title..."/>
                            <InputRightElement>
                                <button className="search-icon" title="Search" onClick={() => {
                                    setSearch(searchRef.current);
                                }}>
                                    <FaSearch />
                                </button>
                            </InputRightElement>
                        </InputGroup>
                    </div>
                    <div className="user-icon">
                        <Menu isLazy>
                            {({ isOpen }) => (
                                <>
                                    <MenuButton isActive={isOpen} as={Button} rightIcon={<FaChevronDown/>}>
                                        {isOpen ? <FaUser style={style}/> : <FaUser style={style}/>}
                                    </MenuButton>
                                    <MenuList>
                                        {user !== null ? (<>
                                            {onDashboard ? <>
                                                <Link to="/">
                                                    <MenuItem>Home</MenuItem>
                                                </Link>
                                            </> : <>
                                                <Link to="./UserDashboard">
                                                    <MenuItem>Dashboard</MenuItem>
                                                </Link>
                                            </>}
                                        <Link to="/">
                                            <MenuItem onClick={signOutUser}>Log Out</MenuItem>
                                        </Link>
                                        </>) : (<>
                                            <MenuItem ref={btnRef} onClick={onOpen}>Login</MenuItem>
                                        </>)}
                                    </MenuList>
                                </>)}
                        </Menu>
                    </div>
                    <button className="cart-wrapper" title="Cart" onClick={cartHandler}>
                        <FaShoppingCart />
                    </button>
                </div>
            </nav>
        </>);
    };

    return(<>
        {winWidth <= 992 ? <>
            {NavbarMobileView()}
        </> : <>
            {NavbarView()}
        </>}
    </>);
}

export default Navbar;