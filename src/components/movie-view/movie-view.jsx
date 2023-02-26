import { useParams } from "react-router";
import { Link } from "react-router-dom";

export const MovieView = ({ movies }) => {
    const { movieId } = useParams();
    const movie = movie.find((b) => movie.id === movieId);
    
    return (
        <div>
            <div>
                <span>Title: </span>
                <span>{movie.title}</span>
            </div>
            <div>
                <span>Director: </span>
                <span>{movie.director}</span>
            </div>
            <Link to={`/`}>
                <button className="back-button">Back</button>
            </Link>
        </div>
    );
};