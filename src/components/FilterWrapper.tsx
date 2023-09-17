import React, {useState, useRef, useEffect} from "react";
import {Select, FormControl, FormLabel, Checkbox} from "@chakra-ui/react";
import { MovieInterface } from "../utils/InterfaceHandler";

import "../styles/filtersWrapper.scss";

interface Props {
	showAside: boolean;
	clearFiltersHandler: () => void;
	applyFiltersHandler: (arg1: string, arg2: string, arg3: string, arg4: boolean) => void;
	availableGenres: MovieInterface[];
}

const FilterWrapper = ({ showAside, clearFiltersHandler, applyFiltersHandler, availableGenres }: Props) => {
    const [genreValue, setGenreValue] = useState<string>("");
    const [filmTypeValue, setFilmTypeValue] = useState<string>("");
    const [yearValue, setYearValue] = useState<string>("");


    const [hideNullImg, setHideNullImg] = useState<boolean>(true);

	const [genreSet, setGenreSet] = useState<any>(() => new Set());
	const genreDisplay = useRef<any>([]);

	const setHandler = (array: any) => {
		if(array.length !== 0){
            array.forEach((elem: any) => {
                elem.genres.forEach((elem: any) => {
                    setGenreSet((prev: any) => new Set(prev).add(elem.name));
                });
            });
        } else{
            setGenreSet({0: "Action", 1: "Adventure",2: "Animation", 3: "Drama", 4: "Animation", 5: "Crime", 6: "Short", 7: "Comedy", 8: "Fantasy", 9: "Musical", 10: "Thriller", 11: "Documentary", 12: "Science Fiction"});
        }
	};

	useEffect(() => {
		setGenreSet(() => new Set());
		setHandler(availableGenres);
		genreDisplay.current = Array.from(genreSet);
	}, [availableGenres]);

    useEffect(() => {
        applyFiltersHandler(genreValue, filmTypeValue, yearValue, hideNullImg);
    }, []);

	const hideNullImgHandler = (elem: any) => {
		if(elem.target.checked === true){
			setHideNullImg(true);
		} else{
			setHideNullImg(false);
		}
	}

    function resetForm(){
        setGenreValue("");
        setFilmTypeValue("");
        setYearValue("");
        setHideNullImg(false);
    }

    return (<>
        <div className="filter-wrapper">
            <FormControl className={ showAside ? "filter-select-wrapper filter-show" : "filter-select-wrapper"}>
                <FormLabel>Genres</FormLabel>
                <Select
                    className="filter-select-elem"
                    variant="flushed"
                    placeholder="Select genre..."
                    iconColor="transparent"
                    value={genreValue}
                    onChange={(value) => {setGenreValue(value.currentTarget.value)}}>
                    {genreDisplay.current.map((elem: any, index: number) => {
                        return(
                            <option id={elem} key={index} value={elem}>{elem}</option>
                        );
                    })}
                </Select>
            </FormControl>
            <FormControl className={ showAside ? "filter-select-wrapper filter-show" : "filter-select-wrapper"}>
                <FormLabel>Film Type</FormLabel>
                <Select
                    className="filter-select-elem"
                    variant="flushed"
                    placeholder="Select film type..."
                    iconColor="transparent"
                    value={filmTypeValue}
                    onChange={(value) => {setFilmTypeValue(value.currentTarget.value)}}>
                    <option value="Movie">Movie</option>
                    <option value="Series">Series</option>
                </Select>
            </FormControl>
            <FormControl className={showAside ? "filter-select-wrapper filter-show" : "filter-select-wrapper"}>
                <FormLabel>Year</FormLabel>
                <Select
                    className="filter-select-elem"
                    variant="flushed"
                    placeholder="Select a timeframe ..."
                    iconColor="transparent"
                    value={yearValue}
                    onChange={(value) => {setYearValue(value.currentTarget.value)}}>
                    <option value="2020">2020s</option>
                    <option value="2010">2010s</option>
                    <option value="2000">2000s</option>
                    <option value="1990">1990s</option>
                    <option value="1980">1980s</option>
                    <option value="1970">1970s</option>
                    <option value="1960">1960s</option>
                    <option value="1950">1950s</option>
                    <option value="1940">1940s</option>
                </Select>
            </FormControl>
            <FormControl className={showAside ? "filter-select-wrapper filter-show" : "filter-select-wrapper"}>
                <FormLabel>Hide 'no image' movies?</FormLabel>
                <Checkbox size="lg" defaultChecked isChecked={hideNullImg} onChange={(elem: any) => {hideNullImgHandler(elem)}}>Hide no cover movies?</Checkbox>
            </FormControl>
        </div>
        <div className={showAside ? "filter-btn-wrapper filter-btn-show" : "filter-btn-wrapper"}>
            <button className="filter-btn clear-btn" onClick={() => {
                clearFiltersHandler();
                resetForm();
            }}>Clear Filters</button>
            <button className="filter-btn apply-btn" onClick={() => applyFiltersHandler(genreValue, filmTypeValue, yearValue, hideNullImg)}>Apply</button>
        </div>
    </>);
};

export default FilterWrapper;