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
    const genreRef = useRef<string>("");
	const filmTypeRef = useRef<string>("");
	const yearRef = useRef<string>("");
	const hideNullImg = useRef<boolean>(true);
	// ! hideNullImg does work on initial load

	const [genreSet, setGenreSet] = useState<any>(() => new Set());
	const genreDisplay = useRef<any>([]);

	const setHandler = (array: any) => {
		array.forEach((elem: any) => {
			elem.genres.forEach((elem: any) => {
				setGenreSet((prev: any) => new Set(prev).add(elem.name));
			});
		});
	};

	useEffect(() => {
		setGenreSet(() => new Set());
		setHandler(availableGenres);
		genreDisplay.current = Array.from(genreSet);
	}, [availableGenres]);

    useEffect(() => {
        applyFiltersHandler(genreRef.current, filmTypeRef.current, yearRef.current, hideNullImg.current);
    }, []);

	const hideNullImgHandler = (elem: any) => {
		if(elem.target.checked === true){
			hideNullImg.current = true;
		} else{
			hideNullImg.current = false;
		}
	}

    return (<>
        <div className="filter-wrapper">
            <FormControl className={ showAside ? "filter-select-wrapper filter-show" : "filter-select-wrapper"}>
                <FormLabel>Genres</FormLabel>
                <Select
                    variant="flushed"
                    placeholder="Select genre..."
                    iconColor="transparent"
                    onChange={(value) => {genreRef.current = value.currentTarget.value;}}>
                    {genreDisplay.current.map((elem: any, index: number) => {
                        return (
                            <option id={elem} key={index} value={elem}>{elem}</option>
                        );
                    })}
                </Select>
            </FormControl>
            <FormControl className={ showAside ? "filter-select-wrapper filter-show" : "filter-select-wrapper"}>
                <FormLabel>Film Type</FormLabel>
                <Select
                    variant="flushed"
                    placeholder="Select film type..."
                    iconColor="transparent"
                    onChange={(value) => {
                        filmTypeRef.current = value.currentTarget.value;
                    }}>
                    <option value="Movie">Movie</option>
                    <option value="Series">Series</option>
                </Select>
            </FormControl>
            <FormControl className={showAside ? "filter-select-wrapper filter-show" : "filter-select-wrapper"}>
                <FormLabel>Year</FormLabel>
                <Select
                    variant="flushed"
                    placeholder="Select a timeframe ..."
                    iconColor="transparent"
                    onChange={(value) => {
                        yearRef.current = value.currentTarget.value;
                    }}>
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
                <Checkbox defaultChecked size="lg" onChange={(elem: any) => hideNullImgHandler(elem)}>Hide no cover movies?</Checkbox>
            </FormControl>
        </div>
        <div className={showAside ? "filter-btn-wrapper filter-btn-show" : "filter-btn-wrapper"}>
            <button className="filter-btn clear-btn" onClick={clearFiltersHandler}>
                Clear Filters
            </button>
            <button className="filter-btn apply-btn"
                onClick={() => applyFiltersHandler(genreRef.current, filmTypeRef.current, yearRef.current, hideNullImg.current)}>Apply</button>
        </div>
    </>);
};

export default FilterWrapper;