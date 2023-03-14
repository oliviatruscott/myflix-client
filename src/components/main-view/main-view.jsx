import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import React from "react";

//imports other components
import { NavigationBar } from "../navigation-bar/navigation-bar";
import { ProfileView } from "../profile-view/profile-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export const MainView = () => {
    const storedUsername = localStorage.getItem("username");
    const storedToken = localStorage.getItem("token");
    const [movies, setMovies] = useState([]); //empty movie array for api
    const [user, setUser] = useState({
        username: "",
        password: "",
        email: "",
        birthday: "",
        favoriteMovies: [],
    });
    const [token, setToken] = useState(null);
    const [toggleFavorites, favoriteMovies] = useState([]);
    
    const toggleFavorite = (movie) => {
        const index = favoriteMovies.indexOf(movie);
        if (index > -1) {
            deleteFavoriteMovie(movie);
            setFavoriteMovies(
                favoriteMovies.filter((favoriteMovie) => favoriteMovie.id !== movie.id)
            );
        } else {
            addFavoriteMovie(movie);
            setFavoriteMovies([...favoriteMovies, movie]);
        }
    };

    const deleteFavoriteMovie = async (movie) => {
        try {
            const response = await fetch(
                `https://pacific-taiga-63279.herokuapp.com/users/${user.username}/movies/${movie.id}`,
                {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );
            const { success, message, data } = await response.json();
        } catch (error) {
            console.error(error);
        }
    };

    const addFavoriteMovie = async (movie) => {
        try {
            const response = await fetch(
                `https://pacific-taiga-63279.herokuapp.com/users/${user.username}/movies/${movie.id}`,
                {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );
            const { success, message, data } = await response.json();
        } catch (error) {
            console.error(error);
        }
    };
    const clearLocalCurrentUser = () => {
        setusername(null);
        setToken(null);
        localStorage.clear();
    };
    
    //fills empty movie array with movies from api
    useEffect(() => {
        if (!token) {
            return;
        }
        fetch('https://pacific-taiga-63279.herokuapp.com/movies', {
            headers: { Authorization: `Bearer ${token}` },
        })
            .then((response) => response.json())
            .then((data) => {
                console.log('data', data);
                const moviesFromApi = data.map((movie) => {
                    return {
                        id: movie._id,
                        title: movie.title,
                        description: movie.description,
                        director: movie.director.name,
                        genre: movie.genre.name,
                    };
                });
                setMovies(moviesFromApi);
                localStorage.setItem('movies', JSON.stringify(moviesFromApi));
            });
    }, [token]);
    
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
                                <Navigate to="/" />
                            ) : (
                                <Col md={5}>
                                    <LoginView onLoggedIn={(user, token) => {
                                        setUser(user);
                                        setToken(token);
                                    }} />
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
                                <Navigate to="/login" replace />
                            ) : movies.length === 0 ? (
                                <Col>The list is empty!</Col>
                            ) : (
                                <Col md={8}>
                                    <MovieView movies={movies} username={user.username} favoriteMovies={user.favoriteMovies} />
                                </Col>
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
                                    toggleFavorite={toggleFavorite}
                                    token={token}
                                    onDelete={clearLocalCurrentUser}
                                />
                            ) : (
                                <Navigate to="/login" replace />
                            )}
                        </React.Fragment>
                    }
                />
                <Route
                    path="/"
                    element={
                        <React.Fragment>
                            {!user ? (
                                <Navigate to="/login" replace />
                            ) : movies.length === 0 ? (
                                <Col>The list is empty!</Col>
                            ) : (
                                <Row className="justify-content-center">
                                    {movies.map((movie) => (
                                        <MovieCard
                                            movie={movie}
                                            toggleFavorite={toggleFavorites}
                                            key={movie.id}
                                        />
                                    ))}
                                </Row>
                            )}
                        </React.Fragment>
                    }
                />
            </Routes>
        </BrowserRouter>
    );
};