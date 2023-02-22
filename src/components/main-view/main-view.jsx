import { useEffect, useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import PropTypes from "prop-types";

export const MainView = () => {
    const [movies, setMovies] = useState([]); //empty movie array for api
    const [selectedMovie, setSelectedMovie] = useState(null);
    //fills empty movie array with movies from api
    useEffect(() => {
        fetch("https://pacific-taiga-63279.herokuapp.com/movies")
            .then((response) => response.json())
            .then((data) => {
                const moviesFromApi = data.map((doc) => {
                    return {
                        id: doc.key,
                        title: doc.title,
                        director: doc.director_name?.[0],
                        genre: doc.genre_name?.[0]
                    };
                });
                setMovies(moviesFromApi);
            });
    }, []);
    
    if (selectedMovie) {
        return (
            <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
        );
    }
    if (movies.length === 0) {
        return <div>The list is empty!</div>;
    }
    return (
        <div>
            {movies.map((movie) => (
                <MovieCard 
                    key={movie.id} 
                    movie={movie}
                    onMovieClick={(newSelectedMovie) => {
                        setSelectedMovie(newSelectedMovie);
                    }}
                />
            ))}
        </div>
    );
};

//define all props constraints
MainView.propTypes = {
    movie: PropTypes.shape({
        title: PropTypes.string.isRequired,
        director: PropTypes.string.isRequired
    }).isRequired,
    onMovieClick: PropTypes.func.isRequired
};