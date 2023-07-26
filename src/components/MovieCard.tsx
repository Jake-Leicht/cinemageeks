import {FaStar} from "react-icons/fa";

import "../styles/movieCard.scss";

interface Props {
	id: number;
	cast?: string[];
	directors?: string[];
	genres?: any;
	rating?: number;
	overview?: string;
	runtime?: number;
	title?: string;
	filmType?: string;
	year?: number;
	cover?: string;
	selectedMovieHandler: (arg: any) => void;
}

// todo: finish rating (.map number of stars as rating)
const MovieCard = ({ selectedMovieHandler, id, title, cover, year, rating, directors, genres}: Props) => {

	return (<>
		<div className="movie-card" onClick={selectedMovieHandler}>
			{cover === undefined ? (
				<><img className="movie-card-img" src={require("../images/no-image-found.jpg")} alt={title}/></>
			) : (
				<><img className="movie-card-img" src={cover} alt={title} /></>
			)}
			<div className="movie-card-content">
				{year === undefined ? (
					<p>{title}</p>
				) : (
					<p>{title} {`(${year})`}</p>
				)}
				{directors === undefined ? (
					<></>
				) : (
					<p className="movie-card-directors">
						{directors.length === 1 ? (
							<>{directors[0]}</>
						) : (
							<>{directors[0]} & {directors[1]}</>
						)}
					</p>
				)}
				{rating === undefined ? <></> : <FaStar className="card-rating-star" />}
				<div className="movie-card-genres-wrapper">
					{genres === undefined ? (
						<></>
					) : (
						<>
							{genres.map((genre: any, index: number) => (<div key={index} className="genre">{genre.name}</div>))}
						</>
					)}
				</div>
			</div>
		</div>
	</>);
};

export default MovieCard;
