import React from "react";
import { connect } from "react-redux";
// import { AppState } from "../../store/rootReducer";

// interface DispatchProps {
// }

// interface StateProps {
// }

// type DashboardProps = DispatchProps & StateProps;

const Home: React.FunctionComponent = (/* props */) => {

    // const isError = !pending && error;

    return <>
        <h2>Home</h2>
        {/* {pending && <Loading />}
        {isError && <Error size={ErrorSize.lg} message="There is an error!" />} */}
        {/* {isNoContent && <NoContent message="No data found :(" />} */}
        <div>Home page placeholder</div>
    </>;
}

const mapStateToProps = (/* state: AppState */) => {
    return {
    }
}

const mapDispatchToProps = {
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);