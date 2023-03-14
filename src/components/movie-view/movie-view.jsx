import { useParams } from 'react-router';
import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { Link } from "react-router-dom";
import MovieCard from "../movie-card/movie-card";
import { useEffect, useState } from "react";

export const MovieView = ({ movies, toggleFav, isFavorite }) => {
    const { movieId } = useParams();
    const movie = movies.find((movie) => movie.id === movieId);
    const [toggleFavorites, favoriteMovies] = useState([]);

    //make sure favorites button/function works with profile view
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
    const handleFavoriteClick = (movie) => {
        toggleFavorite(movie);
    };
    return (
        <>
            <Row className='d-flex flex-row-reverse p-3'>
                <Col md={6} className='d-flex flex-column'>
                    <Row>
                        <Col md={9} className='text-center'>
                            <h1 className="display-6">
                                <span>{movie.title}</span>
                            </h1>
                            <h5 className="lead">
                                <span>Description: </span>
                                <span>{movie.description}</span>
                            </h5>
                            <h5 className="lead">
                                <span>Director: </span>
                                <span>{movie.director}</span>
                            </h5>
                            <h5 className="lead">
                                <span>Genre: </span>
                                <span>{movie.genre}</span>
                            </h5>
                            <br></br>
                            <div>
                                <button type="button" className="btn btn-outline-danger" onClick={handleFavoriteClick}>
                                    {isFavorite ? (
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-heart" viewBox="0 0 16 16">
                                            <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"/>
                                        </svg>
                                    ) : (
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-heart-fill" viewBox="0 0 16 16">
                                            <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/>
                                        </svg>
                                    )}
                                </button>
                            </div>
                            <br></br>
                            <Link to={`/`}>
                                <button varient="link" className="btn btn-outline-secondary">
                                    Back
                                </button>
                            </Link>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </>
    );
};