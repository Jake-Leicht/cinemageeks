import React, {useState, useRef, Suspense} from "react"
import Navbar from "./Navbar"
import { useNavigate } from "react-router-dom";
import {useDisclosure } from "@chakra-ui/react";
import {Footer, LoginDrawer, Aside, Cart, LoadingSkeletons, GenreCard} from "../components/ComponentHandler";
import { FilterInterface, MovieInterface, PurchaseInterface } from "../utils/InterfaceHandler";
import "../styles/cart.scss";

const MovieShowcaseImport = React.lazy(() => {
	return import("../components/MovieShowcase");
});

const ProductPageImport = React.lazy(() => {
    return import("../components/ProductPage");
});

// ! scrollable movieCards issue: scroll between cards and page

const HomePage = () => {
    const navigate: any = useNavigate();

    // ^ Initial API fetch
    const [initialLoad, setInitialLoad] = useState<boolean>(true);
    // ^ Prev load
	const [prevSearch, setPrevSearch] = useState<string>("");
	const [prevSearchData, setPrevSearchData] = useState<any>();

    // ^ Input search & Handler
	const [search, setSearch] = useState<string>("");

    // ^ Filters & Handlers
	const [filters, setFilters] = useState<FilterInterface>({ id: 0o2 });
	const clearFiltersHandler = () => {
		let blankObj: any = { id: 0o2 };
		setFilters(blankObj);
	};
	const applyFiltersHandler = (genre: string, filmType: string, year: string, hideNullImg: boolean) => {
		setFilters({ id: 0o2, genre: genre, filmType: filmType, year: year, hideNullImg: hideNullImg });
	};

	const [availableGenres, setAvailableGenres] = useState<MovieInterface[]>([]);
	const availableGenreHandler = (array: any) => {
		setAvailableGenres(array);
	};

    // ^ SelectedMovie & Handlers
    const [quantity, setQuantity] = useState<number>(1);
	const [selectedMovie, setSelectedMovie] = useState<any>();
	const selectedMovieHandler = (movie: any) => {
		setSelectedMovie(movie);
        ProductPageHandler();
    };

    // ^ ProductPage & Handlers
    const [showProductPage, setShowProductPage] = useState<boolean>(false);
    const ProductPageHandler = () => {
        showProductPage ? setShowProductPage(false) : setShowProductPage(true);
    }
    const closeProductPage = () => {
        setShowProductPage(false);
    }

    // ^ Login drawer Handler
	const { isOpen, onOpen, onClose } = useDisclosure();
    const btnRef = useRef<any>();

    // ^ Cart & Handlers
	const [showCart, setShowCart] = useState<boolean>(false);
	const cartHandler = () => {
		showCart ? setShowCart(false) : setShowCart(true);
	};

    // ^  Purchase & Handlers
	const [purchase, setPurchase] = useState<PurchaseInterface>({ id: 0o1 });
	const purchaseHandler = ( cost: number, quantity: number, movie: MovieInterface, rent: boolean, buy: boolean, movieQuality: string) => {
		setPurchase((purchase: any) => ({
			id: 0o1,
			cost: cost,
			quantity: quantity,
			movie: movie,
			rent: rent,
			buy: buy,
			movieQuality: movieQuality,
		}));
	};

    const clearPurchase = () => {
		let blankObj: any = { id: 0o1 };
		setPurchase(blankObj);
	};

    // ^ Genre Selection & Handlers
    const [genreSelection, setGenreSelection] = useState<boolean>(false);
    const [genreSearch, setGenreSearch] = useState<string>("");

    return(<>
        <Navbar search={search} setSearch={setSearch} onOpen={onOpen} onClose={onClose} 
        btnRef={btnRef} closeProductPage={closeProductPage} cartHandler={cartHandler}/>
        {showProductPage ? <>
        {/* Change fallback for ProductPage?? */}
            <Suspense fallback={<LoadingSkeletons/>}>
                <ProductPageImport selectedMovie={selectedMovie} quantity={quantity}
                setQuantity={setQuantity} purchaseHandler={purchaseHandler}/>
            </Suspense>
        </> : <>
            {genreSelection ? <>
                <button onClick={() => setGenreSelection(false)}>Close</button>
                <GenreCard/>
            </> : <>
                <div className="content">
                    <Aside clearFiltersHandler={clearFiltersHandler} 
                    applyFiltersHandler={applyFiltersHandler} availableGenres={availableGenres}/>
                    <Suspense fallback={<LoadingSkeletons/>}>
                        <MovieShowcaseImport
                            initialLoad={initialLoad}
                            setInitialLoad={setInitialLoad}
                            prevSearch={prevSearch}
                            setPrevSearch={setPrevSearch}
                            prevSearchData={prevSearchData}
                            setPrevSearchData={setPrevSearchData}
                            search={search}
                            filters={filters}
                            selectedMovieHandler={selectedMovieHandler}
                            availableGenreHandler={availableGenreHandler}/>
                    </Suspense>
                </div>
                <Footer />
            </>}
        </>}
        <div className={showCart ? "cart-page-wrapper cart-page-show" : "cart-page-wrapper"}>
            <Cart
                cartHandler={cartHandler}
                purchase={purchase}
                clearPurchase={clearPurchase}/>
        </div>
		<LoginDrawer isOpen={isOpen} onOpen={onOpen} onClose={onClose} 
        btnRef={btnRef}/>
    </>);
}

export default HomePage;