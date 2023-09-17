import {useState, useRef, useEffect} from "react";
import {ProductView} from "../components/ComponentHandler";
import {FaPlus, FaMinus} from "react-icons/fa";
import { MovieInterface } from "../utils/InterfaceHandler";
import { useToast } from "@chakra-ui/react";
import "../styles/productPage.scss";

interface Props{
    selectedMovie: any;
    quantity: number;
    setQuantity: any;
    purchaseHandler: (cost: number, quantity: number, movie: MovieInterface, rent: boolean,
        buy: boolean, movieQualtiy: string) => void;
}

const ProductPage = ({selectedMovie, quantity, setQuantity, purchaseHandler}: Props) => {

    const RENT_COST: number = 2.0;
    const BUY_COST: number = 5.0;

    const [viewProductIndex, setViewProductIndex] = useState<number>(1);
    const [cost, setCost] = useState<number>(0);
    const movieQualityRef = useRef<string>("");
    const rentMovieRef = useRef<boolean>(false);
    const buyMovieRef = useRef<boolean>(false);

    const [btnIndex, setBtnIndex] = useState<number>(0);
    const btnIndexHandler = (input: number) => {
        input === btnIndex ? setBtnIndex(0) : setBtnIndex(input);
    }

    const quantityHandler = (indicator: string) => {
        if(indicator === "minus" && quantity > 1){
            setQuantity(quantity - 1);
        } else if(indicator === "add"){
            setQuantity(quantity + 1);
        }
    }

    const selectionHandler = (cost: number, rent: boolean, buy: boolean, movieQuality: string) => {
        setCost(cost);
        rentMovieRef.current = rent;
        buyMovieRef.current = buy;
        movieQualityRef.current = movieQuality;
    }

    // ^ Modal & Handler
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const modalOpenHandler = () => {
        {modalOpen ? setModalOpen(false) : setModalOpen(true)}
        window.scrollTo(0, 0);
    }

    function displayCast(array: string[]){
        return array.join(", ")
    }

    // ^ Responsiveness
    const [winWidth, setWinWidth] = useState<number>(0);

    const getWindowSize = () => {
        let width = window.outerWidth;
        setWinWidth(width);
    }

    useEffect(() => {
        getWindowSize();

        window.addEventListener("resize", getWindowSize);
        return () => 
            window.removeEventListener("resize", getWindowSize);
    }, []);

    const toast = useToast();

    function DesktopView(){
        return(<>
            <div className={modalOpen ? "product-wrapper no-scrolling" : "product-wrapper"}>
                <div className="product-viewing">
                    {/* todo: make component? */}
                    <div className="current-view-wrapper">
                        <ProductView index={viewProductIndex} cover={selectedMovie.cover}/>
                    </div>
                    <div className="product-views-wrapper">
                        <div className="product-view" onMouseEnter={() => setViewProductIndex(1)}>
                            <div className="movie-case-wrapper-showcase">
                                <img className="movie-case-img-showcase" src={selectedMovie.cover} alt="Cover"/>
                            </div>
                        </div>
                        <div className="product-view" onMouseEnter={() => setViewProductIndex(2)}>
                            <div className="cd-wrapper-showcase">
                                <img className="cd-img-showcase" src={selectedMovie.cover} alt="Cover"/>
                                <div className="cd-center-showcase"></div>
                            </div>
                        </div>
                        <div className="product-view" onMouseEnter={() => setViewProductIndex(3)}>
                            <div className="open-case-wrapper open-case-wrapper-adjusted open-case-wrapper-showcase">
                                <div className="case-side left-side left-side-adjusted">
                                    <img className="open-case-img" src={selectedMovie.cover} alt="Cover"/>
                                </div>
                                <div className="case-side right-side right-side-adjusted">
                                    <div className="case-cd-wrapper case-cd-wrapper-adjusted">
                                        <img className="open-case-cd-img" src={selectedMovie.cover} alt="Cover"/>
                                        <div className="case-cd-center case-cd-center-adjusted"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {winWidth <= 576 ? <>
                        <div className="mobile-view-wrapper">
                            <button onClick={() => setViewProductIndex(1)} className={viewProductIndex === 1 ? "active" : ""} title="view"></button>
                            <button onClick={() => setViewProductIndex(2)} className={viewProductIndex === 2 ? "active" : ""} title="view"></button>
                            {/* <button onClick={() => setViewProductIndex(3)} className={viewProductIndex === 3 ? "active" : ""} title="view"></button> */}
                        </div>
                    </> : <></>}
                </div>
                <div className="product-info">
                    <h1 className="product-title">{selectedMovie.title}</h1>
                    <h3 className="product-overview">{selectedMovie.overview}</h3>
                    <div className="contributors-wrapper">
                        {selectedMovie.directors === undefined ? <></> : <><h5>Directed by: {selectedMovie.directors}</h5></>}
                        <h5>Cast: {displayCast(selectedMovie.cast)}</h5>
                    </div>
                    <ul className="attributes-wrapper">
                        {selectedMovie.filmType === undefined ? <></> : <><li>Film Type: {selectedMovie.filmType}</li></>}
                        {selectedMovie.runtime === undefined ? <></> : <><li>Runtime: {selectedMovie.runtime} mins</li></>}
                        {selectedMovie.genres === undefined ? <></> : <><li>Genres: {selectedMovie.genres.map((elem: any) => elem.name + ", ")}</li></>}
                        {selectedMovie.rating === undefined ? <></> : <><li>Rating: {selectedMovie.rating}</li></>}
                        {selectedMovie.year === undefined ? <></> : <><li>Year: {selectedMovie.year}</li></>}
                    </ul>
                    <div className="product-btn-wrapper">
                        <button onClick={modalOpenHandler} className="product-btn">Add to Cart</button>
                        {/*Currently buy btn does nothing (open cart) */}
                        <button className="product-btn">Buy Now</button>
                    </div>
                </div>
                {modalOpen ? <>
                    <div className="background-blur">
                        <div className="modal-wrapper">
                            <div className="modal-header">
                                <h1>Purchase Options</h1>
                                <button onClick={() => {
                                    modalOpenHandler();
                                    setQuantity(1);
                                    setBtnIndex(0);
                                }}>Close</button>
                            </div>
                            <div className="modal-btn-wrapper">
                                <button onClick={() => {
                                    selectionHandler(RENT_COST, true, false, "UHD");
                                    btnIndexHandler(1);
                                }} className={btnIndex === 1 ? "purchase-option-btn selected-btn" : "purchase-option-btn"}>
                                    <span>Rent</span>
                                    <span>UHD $2.00</span>
                                </button>
                                <button onClick={() => {
                                    selectionHandler(RENT_COST, true, false, "HD");
                                    btnIndexHandler(2);
                                }} className={btnIndex === 2 ? "purchase-option-btn selected-btn" : "purchase-option-btn"}>
                                    <span>Rent</span>
                                    <span>HD $2.00</span>
                                </button>
                                <button onClick={() => {
                                    selectionHandler(RENT_COST, true, false, "SD");
                                    btnIndexHandler(3);
                                }} className={btnIndex === 3 ? "purchase-option-btn selected-btn" : "purchase-option-btn"}>
                                    <span>Rent</span>
                                    <span>SD $2.00</span>
                                </button>
                                <button onClick={() => {
                                    selectionHandler(BUY_COST, false, true, "UHD");
                                    btnIndexHandler(4);
                                }} className={btnIndex === 4 ? "purchase-option-btn selected-btn" : "purchase-option-btn"}>
                                    <span>Buy</span>
                                    <span>UHD $5.00</span>
                                </button>
                                <button onClick={() => {
                                    selectionHandler(BUY_COST, false, true, "HD");
                                    btnIndexHandler(5);
                                }} className={btnIndex === 5 ? "purchase-option-btn selected-btn" : "purchase-option-btn"}>
                                    <span>Buy</span>
                                    <span>HD $5.00</span>
                                </button>
                                <button onClick={() => {
                                    selectionHandler(BUY_COST, false, true, "SD");
                                    btnIndexHandler(6);
                                }} className={btnIndex === 6 ? "purchase-option-btn selected-btn" : "purchase-option-btn"}>
                                    <span>Buy</span>
                                    <span>SD $5.00</span>
                                </button>
                            </div>
                            <div className="product-quantity-wrapper">
                                <span className="quantity-text">Quantity</span>
                                <button className="quantity-btn" title="minus btn" onClick={() => quantityHandler("minus")}>
                                    <FaMinus/>
                                </button>
                                <span className="quantity-amount">{quantity}</span>
                                <button className="quantity-btn" title="add btn" onClick={() => quantityHandler("add")}>
                                    <FaPlus/>
                                </button>
                                <span className="quantity-text">${cost * quantity}.00</span>
                            </div>
                            <div className="modal-footer">
                                <button className="modal-btn" onClick={() => {
                                    purchaseHandler(cost, quantity, 
                                        selectedMovie, rentMovieRef.current, buyMovieRef.current, 
                                        movieQualityRef.current);
                                    toast({
                                        title: "Item added to cart",
                                        position: "top",
                                        duration: 1500,
                                        status: "info",
                                        isClosable: true
                                    });
                                }}>Save</button>
                            </div>
                        </div>
                    </div>
                </> : <></>}
            </div>
        </>);
    }

    return(<>
        {DesktopView()}
    </>);
}

export default ProductPage;