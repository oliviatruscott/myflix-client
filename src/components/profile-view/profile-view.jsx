import React from 'react';
import { UpdateView } from './update-user';
import { UserInfo } from './user-info';
import { FavoriteMovies } from './favorite-movies';
import { DeleteUser } from './delete-user';

export const ProfileView = ({ movies, user }) => {
    const storedToken = localStorage.getItem('token');
    
    return (
        <>
            <UserInfo user={user} />
            <UpdateView storedToken={storedToken} storedUser={user} />
            <DeleteUser storedToken={storedToken} storedUser={user} />
            <FavoriteMovies movies={movies} storedUser={user} />
        </>
    );
};