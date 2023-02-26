import { useEffect, useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import PropTypes from "prop-types";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { NavigationBar } from "../navigation-bar/navigation-bar";
import { ProfileView } from "../profile-view/profile-view";
import React from "react";

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
        <BrowserRouter>
            <NavigationBar
                user={user}
                onLoggedOut={() => {
                    setUser(null);
                    setToken(null);
                    localStorage.clear();
                }}
            />
            <Routes>
                <Route
                    path="/signup"
                    element={
                        <React.Fragment>
                            {user ? (
                                <Navigate to="/" />
                            ) : (
                                <Col md={5}>
                                    <SignupView />
                                </Col>
                            )}
                        </React.Fragment>
                    }
                />
                <Route
                    path="/login"
                    element={
                        <React.Fragment>
                            {user ? (
                                <Navigaate to="/" />
                            ) : (
                                <Col md={5}>
                                    <LoginView onLoggedIn={(user) => setUser(user)} />
                                </Col>
                            )}
                        </React.Fragment>
                    }
                />
                <Route 
                    path="/movies/:movieId"
                    element={
                        <React.Fragment>
                            {!user ? (
                                <Navigate to="/login" />
                            ) : movie.length === 0 ? (
                                <Col>The list is empty!</Col>
                            ) : (
                                <Col md={8}>
                                    <MovieView movie={movie} />
                                </Col>
                            )}
                        </React.Fragment>
                    }
                />
                <Route
                    path="/"
                    element={
                        <React.Fragment>
                            {!user ? (
                                <Navigate to="/login" />
                            ) : movie.length ===0 ? (
                                <Col>The list is empty!</Col>
                            ) : (
                                <Row className="justify-content-center">
                                    {movie.map((movie) => (
                                        <MovieCard 
                                            movie={movie}
                                            isFavorite={favoriteMovies.includes(movie)}
                                            toggleFavorite={toggleFavorites}
                                            key={movie.id}
                                        />
                                    ))}
                                </Row>
                            )}
                        </React.Fragment>
                    }
                />
                <Route
                    path="/profile"
                    element={
                        <React.Fragment>
                            {user ? (
                                <ProfileView
                                    user={user}
                                    favoriteMovies={favoriteMovies}
                                    toggleFavorites={toggleFavorite}
                                    token={token}
                                    onDelete={clearLocalCurrentUser}
                                />
                            ) : (
                                <Navigate to="/login" />
                            )}
                        </React.Fragment>
                    }
                />
            </Routes>
        </BrowserRouter>
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