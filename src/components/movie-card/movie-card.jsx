import React from "react";
import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

export const MovieCard = ({ movie }) => {
    return (
        <Card className="h-100">
            <Card.Body>
                <Card.Title>{movie.title}</Card.Title>
                <Card.Text>{movie.director}</Card.Text>
                <Link to={`/movies/${encodeURIComponent(movie.id)}`}>
                    <Button onClick={() => onMovieClick(movie)} variant="link">
                        Open
                    </Button>
                </Link>
            </Card.Body>
        </Card>
    );
};

//define all props constraints for MovieCard
MovieCard.propTypes = {
    movie: PropTypes.shape({
        title: PropTypes.string.isRequired,
        director: PropTypes.string.isRequired
    }).isRequired
};