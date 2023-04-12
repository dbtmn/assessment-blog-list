import React from "react";
import { connect } from "react-redux";
// import { AppState } from "../../store/rootReducer";

// interface DispatchProps {
// }

// interface StateProps {
// }

// type BlogProps = DispatchProps & StateProps;

const Blog: React.FunctionComponent/* <BlogProps> */ = (/* props */) => {

    return <>
        <h2>Blog</h2>
        {/* {pending && <Loading />} */}
        {/* {isError && <Error size={ErrorSize.lg} message="There is an error!" />}
        {isNoContent && <NoContent message="No data found :(" />} */}
        <div>Blog page placeholder</div>
    </>;
}

const mapStateToProps = (/* state: AppState */) => {
    return {
    }
}

const mapDispatchToProps = {
};

export default connect(mapStateToProps, mapDispatchToProps)(Blog);