import React from "react";
import SearchPresenter from "./SearchPresenter";
import { MovieApi, TVApi } from "../../API";

export default class extends React.Component {
    state = {
        movieResults: null,
        tvResults: null,
        searchTerm: "",
        loading: true,
        error: null,
    };

    handleSubmit = event => {
        event.preventDefault();
        const { searchTerm } = this.state;

        if(searchTerm !== "")
        {
            this.searchByTerm();
        }
    };

    updateTerm = event => {
        const { target: { value } } = event;
        this.setState({
            searchTerm: value
        });
    };

    searchByTerm = async () => {
        const {searchTerm } = this.state;
        this.setState({loading: true });

        try{
            const {data: {results: movieResults}} = await MovieApi.search(searchTerm);
            const {data: {results: tvResults}} = await TVApi.search(searchTerm);
            this.setState({
                movieResults,
                tvResults,
            });
        }
        catch{
            this.setState({ error : "검색 정보를 찾을수 없습니다."});
        }
        finally{
            this.setState({ loading : false });
        }
    };

    render() {
        console.log(this.state);
        const {
            movieResults,
            tvResults,
            searchTerm,
            loading,
            error,
        } = this.state;

        return (
            <SearchPresenter
                movieResults={movieResults}
                tvResults={tvResults}
                loading={loading}
                error={error}
                searchTerm={searchTerm}
                handleSubmit={this.handleSubmit}
                updateTerm={this.updateTerm}
            />
        );
    }
}