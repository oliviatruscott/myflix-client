import PropTypes from "prop-types";

export const MovieView = ({ movie, onBackClick }) => {
    return (
        <div>
            <div>
                <img src={movie.image} />
            </div>
            <div>
                <span>Title: </span>
                <span>{movie.title}</span>
            </div>
            <div>
                <span>Director: </span>
                <span>{movie.director}</span>
            </div>
            <button onClick={onBackClick}>Back</button>
        </div>
    );
};

//edit
//define all props constraints
// MovieCard.propTypes = {
//     movie: PropTypes.shape({
//         title: PropTypes.string.isRequired,
//         director: PropTypes.string.isRequired
//     }).isRequired,
//     onMovieClick: PropTypes.func.isRequired
// };