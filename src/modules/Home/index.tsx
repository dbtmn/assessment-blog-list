import React from "react";
import { connect } from "react-redux";
// import { AppState } from "../../store/rootReducer";

import "./index.scss";

// interface DispatchProps {
// }

// interface StateProps {
// }

// type DashboardProps = DispatchProps & StateProps;

const Home: React.FunctionComponent = (/* props */) => {

    // const isError = !pending && error;

    return <>
        <div className="home__add-section">Create a Blog Placeholder</div>
        {/* {pending && <Loading />}
        {isError && <Error size={ErrorSize.lg} message="There is an error!" />} */}
        {/* {isNoContent && <NoContent message="No data found :(" />} */}
        <div className="home__items-section">Blog Items Placeholder</div>
    </>;
}

const mapStateToProps = (/* state: AppState */) => {
    return {
    }
}

const mapDispatchToProps = {
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);