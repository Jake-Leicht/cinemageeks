import React, {useState, useEffect} from "react";
import {MovieCard, LoadingSkeletons} from "./ComponentHandler";
import { fetchData } from "../utils/ApiConfig";
import { FilterInterface, MovieInterface } from "../utils/InterfaceHandler";

import "../styles/movieShowcase.scss";

interface Props {
	initialLoad: boolean;
	setInitialLoad: any;
	prevSearch: string;
	setPrevSearch: any;
	prevSearchData: any;
	setPrevSearchData: any;
	filters: FilterInterface;
	search: string;
	selectedMovieHandler: (arg1: MovieInterface) => void;
	availableGenreHandler: (arg1: MovieInterface[]) => void;
}

const MovieShowcase = ({ initialLoad, setInitialLoad, prevSearch, 
	setPrevSearch, prevSearchData, setPrevSearchData, filters, 
	search, selectedMovieHandler, availableGenreHandler,}: Props) => {

    // ^ Suspense (conditional) Loading
	const [isLoaded, setIsLoaded] = useState<boolean>(false);
	const [loadError, setLoadError] = useState<boolean>(false);

	var title: string = search.toLowerCase().trim();
		if (title === "") {
			title = "superman";
		}
		// * SEARCH BY TITLE
		//'https://streaming-availability.p.rapidapi.com/v2/search/title?title=${TITLE}&country=us&show_type=all&output_language=en'
		// * Search by BASIC (genre and keyword?)
		//'https://streaming-availability.p.rapidapi.com/v2/search/basic?country=us&services=netflix%2Cprime.buy%2Chulu.addon.hbo%2Cpeacock.free&output_language=en&show_type=ALL&genre=18&show_original_language=en&keyword=zombie';
		let url: string = `https://streaming-availability.p.rapidapi.com/v2/search/title?title=${title}&country=us&output_language=en`;

	const fetchHandler = () => {
		try{
			fetchData(url).then((elem) => {
				console.log("API CALLED!");
				setTimeout(() => {
					moviesHandler(elem);
					setPrevSearchData(elem);
				}, 100);
			});
			setPrevSearch(title);
		} catch (error){
			console.log(`Error: ${error}`);
			setLoadError(true);
		}
	}

	const dataRetrieval = () => {
		console.log("DATA RETRIEVAL");
		if(prevSearchData.length !== 0){
			try{
				moviesHandler(prevSearchData);
			} catch (error){
				console.log(`Error: ${error}`);
				setLoadError(true);
			}
		}
	}

	useEffect(() => {
		if(initialLoad === true){
			setIsLoaded(false);
			fetchHandler();
			setInitialLoad(false);
		}
	}, []);

	useEffect(() => {
		setIsLoaded(false);
		if(initialLoad === false){
			if(prevSearch !== null && prevSearch !== title){
				fetchHandler();
			} else{
				dataRetrieval();
			}
		}
	}, [search]);

	// *Movies/handlers
	const [movies, setMovies] = useState<MovieInterface[]>([]);
	const moviesHandler = (input: any) => {
		clearMoviesArray();
		input.forEach((elem: any, index: number) => {
			let movieID: number = getID();
			let movieKey: number = index;
			setMovies((prevMovies) => [
				...prevMovies,
				{
					id: movieID,
					key: movieKey,
					cast: elem.cast,
					directors: elem.directors,
					genres: elem.genres,
					rating: elem.rating,
					overview: elem.overview,
					runtime: elem.runtime,
					title: elem.title,
					filmType: elem.type,
					year: elem.year,
					cover: elem.backdropURLs.original,
				},
			]);
		});
	};
	const clearMoviesArray = () => {
		setMovies((movies) => []);
	};

	const getID = () => {
		return Math.random() * 1000;
	};
	// * Movies handlers end
	const [result, setResult] = useState<MovieInterface[]>(movies);

	useEffect(() => {
		// todo: sort movies (alphabetize) {movies are alphabetized but not in the best way}
		availableGenreHandler(movies);
		let resultTemp: MovieInterface[] = movies;
		resultTemp = filterGenreArray(movies);
		resultTemp = filterFilmTypeArray(resultTemp);
		resultTemp = filterYearArray(resultTemp);

		resultTemp = sortByAlphabetize(resultTemp);

		setResult(resultTemp);
		setIsLoaded(true);
	}, [filters, movies]);

	const sortByAlphabetize = (array: any) => {
		// ! Sort movies with same title by year {future}
		let array_a: any = [];
		let array_b: any = [];
		let regex: any = new RegExp(`^${title}`);

		array.forEach((elem: any) => {
			if(regex.test(elem.title.toLowerCase()) === true){
				array_a.push(elem);
			} else{
				array_b.push(elem);
			}
		});

		array_a.sort((a: any, b: any) => a.title.toLowerCase().localeCompare(b.title.toLowerCase()));
		array_b.sort((a: any, b: any) => a.title.toLowerCase().localeCompare(b.title.toLowerCase()));
		
		array_b.forEach((elem: any) => array_a.push(elem));

		return array_a;
	}

	const filterGenreArray = (array: MovieInterface[]) => {
		if (filters.genre === undefined || filters.genre === "") {
			return array;
		} else {
			return array.filter((elem: any) =>
				elem.genres.some(
					(genre: any) => genre.name.toLowerCase() === filters.genre?.toLowerCase()
				)
			);
		}
	};

	const filterFilmTypeArray = (array: MovieInterface[]) => {
		if (filters.filmType === undefined || filters.filmType === "") {
			return array;
		} else {
			return array.filter(
				(elem: any) => elem.filmType.toLowerCase() === filters.filmType?.toLowerCase()
			);
		}
	};

	const filterYearArray = (array: MovieInterface[]) => {
		if (filters.year === undefined || filters.year === "") {
			return array;
		} else {
			let yearHolder: number = parseInt(filters.year);
			let maxRange = yearHolder + 9;
			return array.filter(
				(elem: any) => elem.year >= yearHolder && elem.year <= maxRange
			);
		}
	};

    function displayMovie(movie: MovieInterface, index: number) {
		if(filters.hideNullImg === true){
			if(movie.cover !== undefined){
				return (
					<MovieCard
						id={movie.id}
						key={index}
						title={movie.title}
						cover={movie.cover}
						year={movie.year}
						rating={movie.rating}
						directors={movie.directors}
						genres={movie.genres}
						selectedMovieHandler={() => selectedMovieHandler(movie)}/>
				);
			}
		} else{
			return (
				<MovieCard
					id={movie.id}
					key={index}
					title={movie.title}
					cover={movie.cover}
					year={movie.year}
					rating={movie.rating}
					directors={movie.directors}
					genres={movie.genres}
					selectedMovieHandler={() => selectedMovieHandler(movie)}/>
			);
		}
	}

    return(<>
		{loadError ? <>
			<div className="error-wrapper">
					<img src={require("../images/error.png")} alt="Error" />
					<h1>An error has occurred loading your film selection</h1>
				</div>
		</> : <>
			<div className="movie-display-wrapper">
				{isLoaded ? (
					<>{result.map(displayMovie)}</>
				) : (
					<>
						<LoadingSkeletons />
					</>
				)}
			</div>
		</>}
    </>);
}

export default MovieShowcase;