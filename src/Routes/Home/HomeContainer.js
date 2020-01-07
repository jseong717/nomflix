import React from "react";
import HomePresenter from "./HomePresenter";
import { MovieApi } from "../../API";

export default class extends React.Component {
    state = {
        nowPlaying: null,
        upcoming: null,
        popular: null,
        error: null,
        loading: true,
    };

    async componentDidMount() {
        try{
            const {data: { results: nowPlaying }} = await MovieApi.nowPlaying();
            const {data: { results: upcoming }} = await MovieApi.upcoming();
            const {data: { results: popular }} = await MovieApi.popular();

            this.setState({
                nowPlaying,
                upcoming,
                popular
            });
        }
        catch{
            this.setState({
                error: "영화의 정보를 찾지 못했습니다."
            })
        }
        finally{
            this.setState({
                loading: false
            });
        }
    }

    render() {
        const { nowPlaying, upcoming, popular, error, loading } = this.state;
        return (
            <HomePresenter
                nowPlaying={nowPlaying}
                upcoming={upcoming}
                popular={popular}
                error={error}
                loading={loading}
            />
        );
    };
}