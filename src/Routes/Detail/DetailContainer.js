import React from "react";
import DetailPresenter from "./DetailPresenter";
import { MovieApi, TVApi } from "../../API";

export default class extends React.Component {
    constructor(props) {
        super(props);
        const {
            location: {pathname}
        } = props;

        this.state = {
            result: null,
            error: null,
            loading: true,
            isMovie: pathname.includes("/movie/"),
        };
    }
    

    async componentDidMount() {
        const 
        {
            match: 
            {
                params: 
                { 
                    id 
                }
            },
            history: 
            {
                push
            },
        } = this.props;

        const { isMovie } = this.state;

        const parsedId = parseInt(id);
        if(isNaN(parsedId))
        {
            return push("/");
        }
        let result = null;
        try{
            if(isMovie)
            {
                ({data: result } = await MovieApi.movieDetail(parsedId));
            }
            else
            {
                ({data: result } = await TVApi.tvDetail(parsedId));
            }
        }
        catch{
            this.setState({ error: "아무것도 없습니다."})
        }
        finally{
            this.setState({ loading: false, result });
        }
    }

    render() {
        const { result, error, loading } = this.state;
        return (
            <DetailPresenter
                result={result}
                error={error}
                loading={loading}
            />
        );
    };
}