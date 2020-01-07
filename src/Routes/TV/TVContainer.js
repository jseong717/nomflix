import React from "react";
import TVPresenter from "./TVPresenter";
import { TVApi } from "../../API";

export default class extends React.Component {
    state = {
        topRated: null,
        popular: null,
        airingToday: null,
        loading: true,
        error: null,
    };

    async componentDidMount() {
        try{
            const {data: {results:topRated}} = await TVApi.topRated();
            const {data: {results:popular}} = await TVApi.popular();
            const {data: {results:airingToday}} = await TVApi.airingToday();

            this.setState({topRated, popular, airingToday});
        }
        catch{
            this.setState({ error : "TV정보를 찾지 못했습니다."})
        }
        finally{
            this.setState({ loading : false})
        }
    }

    render() {
        const {
            topRated,
            popular,
            airingToday,
            loading,
            error,
        } = this.state;

        return (
            <TVPresenter
                topRated={topRated}
                popular={popular}
                airingToday={airingToday}
                loading={loading}
                error={error}
            />
        );
    }
}