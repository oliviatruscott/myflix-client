import { useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export const MainView = () => {
    const [movies, setMovies] = useState([
        {
            id: 1,
            title: "Pride & Prejudice",
            image: "https://movieposters2.com/images/1375057-b.jpg",
            director: "Joe Wright"
        },
        {
            id: 2,
            title: "Castle in the Sky",
            image: "https://upload.wikimedia.org/wikipedia/en/f/f5/Castle_in_the_Sky_%281986%29.png",
            director: "Hayao Miyazaki"
        },
        {
            id: 5,
            title: "Anastasia",
            image: "https://en.wikipedia.org/wiki/Anastasia_(1997_film)#/media/File:Anastasia-don-bluth.jpg",
            director: "Don Bluth"
        }
    ]);

    const [selectedMovie, setSelectedMovie] = useState(null);

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