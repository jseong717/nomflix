import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import Loader from "../../Components/Loader";
import Section from "../../Components/Section";
import Message from "../../Components/Message";

const Container = styled.div`
    padding: 20px, 0px;
`;

const Form = styled.form`
    margin-bottom: 50px;
    width:100%;
`;

const Input = styled.input`
    all: unset;
    font-size: 28px;
    width:100%;
`;

const SearchPresenter = ({
    movieResults,
    tvResults,
    searchTerm,
    error,
    loading,
    handleSubmit, 
    updateTerm}) => ( 
    <Container>
        <Form onSubmit={handleSubmit}>
            <Input placeholder="영화나 TV쇼를 검색하세요" value={searchTerm} onChange={updateTerm}/>
        </Form>
        {loading ? <Loader/> : 
        <>
            {movieResults && movieResults.length > 0 &&
                <Section title="Movie Results">
                    {movieResults.map(movie => (<span key={movie.id}>{movie.title}</span>))}
                </Section>}
            {tvResults && tvResults.length > 0 &&
                <Section title="Tv Results">
                    {tvResults.map(tv => (<span key={tv.id}>{tv.name}</span>))}
                </Section>}
            {error && <Message text={error} color="#d63031"/>}
            {tvResults && movieResults && tvResults.length === 0 && movieResults.length ===0 && <Message text="Nothing found" color="#d63031"/>}
        </>}
    </Container>
    );

SearchPresenter.propTypes = {
    movieResults : PropTypes.array,
    tvResults : PropTypes.array,
    loading : PropTypes.bool.isRequired,
    error : PropTypes.string,
    searchTerm : PropTypes.string,
    handleSubmit : PropTypes.func.isRequired,
    updateTerm : PropTypes.func.isRequired
};

export default SearchPresenter;