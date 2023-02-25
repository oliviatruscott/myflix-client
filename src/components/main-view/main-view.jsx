import { useEffect, useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import PropTypes from "prop-types";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

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
    return (
        <Row>
            {!user ? (
                <Col md={5}>
                    <LoginView
                        onLoggedIn={(user, token) => {
                            setUser(user);
                            setToken(token);
                        }}
                    />
                    or
                    <SignupView />
                </Col>
            ) : selectedMovie ? (
                <Col md={8}>
                    <MovieView
                        movie={selectedMovie}
                        onBackClick={() => setSelectedMovie(null)}
                    />
                </Col>
            ) : movie.length === 0 ? (
                <div>The list is empty!</div>
            ): (
                <>
                    {movie.map((movie) => (
                        <Col classNmae="mb-5" key={movie.id} md={3}>
                            <MovieCard
                                key={movie.id}
                                movie={movie}
                                onMovieClick={(newSelectedMovie) => {setSelectedMovie(newSelectedMovie);}}
                            />
                        </Col>
                    ))}
                </>
            )}
        </Row>
    );
}

//define all props constraints
MainView.propTypes = {
    movie: PropTypes.shape({
        title: PropTypes.string.isRequired,
        director: PropTypes.string.isRequired
    }).isRequired,
    onMovieClick: PropTypes.func.isRequired
};