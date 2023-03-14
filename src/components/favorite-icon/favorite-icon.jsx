import { Link } from 'react-router-dom';
import React from 'react';
import { FaHeart } from 'react-icons/fa';

export const FavoriteIcon = ({ user, movie, updateUserOnFav }) => {
    const token = localStorage.getItem('token');
    const alreadyFavorite = user.FavoriteMovies.find(
        (favMovieId) => favMovieId === movie.id
    );
    const toggleFavorite = () => {
        if (!token) return;
        const url = `https://pacific-taiga-63279.herokuapp.com/users/${user.Username}/movies/${movie.id}`;
        let requestOptions = {
            method: '',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        let resultAlert = '';
        if (alreadyFavorite) {
            requestOptions.method = 'DELETE';
            resultAlert = `${movie.title} is deleted from the list of favorites`;
            iconChange = () =>
                document.querySelector('svg').classList.remove('favorite-movie');
        } else {
            requestOptions.method = 'POST';
            resultAlert = `${movie.title} is added to the list of favorites`;
            iconChange = () =>
                document.querySelector('svg').classList.add('favorite-movie');
        }
        fetch(url, requestOptions)
            .then((response) => response.json())
            .then((data) => {
                alert(`${resultAlert}`);
                updateUserOnFav(data);
                document.querySelector('svg').classList.add('favorite-movie');
            })
            .catch((e) => {
                alert('Something went wrong');
            });
    };
    return (
        <Link
            onClick={() => toggleFavorite()}
            className='favorite-icon'
            id='favMovieButton'
        >
            {alreadyFavorite ? <FaHeart className='favorite-movie' /> : <FaHeart />}
        </Link>
    );
};