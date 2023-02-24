import { useEffect, useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import PropTypes from "prop-types";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";

export const MainView = () => {
    const [movies, setMovies] = useState([]); //empty movie array for api
    const [selectedMovie, setSelectedMovie] = useState(null);
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const [user, setUser] = useState(storedUser? storedUser : null);
    const [token, setToken] = useState(null);
    const storedToken = localStorage.getItem("token");
    //fills empty movie array with movies from api
    useEffect(() => {
        if (!token) {
            return;
        }
        fetch("https://pacific-taiga-63279.herokuapp.com/movies", {
            headers: { Authorization: `Bearer ${token}` }
        })
        .then((response) => response.json())
        .then((data) => {
            //double check that after : works and is correct
            const moviesFromApi = data.map((movie) => {
                return {
                    id: movie.id,
                    title: movie.title,
                    description: movie.description,
                    director: movie.directorName,
                    genre: movie.genreName
                };
            });
            setMovies(moviesFromApi);
        }, [token]);
    }, []);
    if (!user) {
        return (
            <>
                <LoginView
                    onLoggedIn={(user, token) => {
                        setUser(user);
                        setToken(token);
                    }}
                />
                or
                <SignupView />
            </>
        );
    }
    if (selectedMovie) {
        return (
            <>
                <button onClick={() => { setUser(null); setToken(null); localStorage.clear();}}>
                    Logout
                </button>
                <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
            </>
        );
    }
    if (movies.length === 0) {
        return (
            <>
                <button onClick={() => { setUser(null); setToken(null); localStorage.clear();}}>
                        Logout
                </button>
                <div>The list is empty!</div>
            </>
        );
    }
    return (
        <div>
            <button onClick={() => { setUser(null); setToken(null); localStorage.clear(); }}>
                Logout
            </button>
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