import { useParams } from 'react-router';
import React from 'react';
import { Row, Col } from 'react-bootstrap';

export const MovieView = ({ movies }) => {
    const { movieId } = useParams();
    const movie = movie.find((b) => movie.id === movieId);

    return (
        <>
            <Row className='d-flex flex-row-reverse p-3'>
                <Col md={7} className='d-flex flex-column'>
                    <Row className='d-flex flex-row  justify-content-between'>
                        <Col md={9} className='d-flex flex-column'>
                            <h3 className='my-0'>
                                <span>Title: </span>
                                <span>{movie.title}</span>
                            </h3>
                            <h5 className='mt-1 text-left text-muted'>
                                <span>Director: </span>
                                <span>{movie.director.name}</span>
                            </h5>
                        </Col>

                        <Col md={3} className='align-self-end mb-2 text-end'>
                            <span>Genre: </span>
                            <span className='fw-bolder'>{movie.genre.name}</span>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </>
    );
};