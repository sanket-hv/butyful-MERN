import React from "react";

function PrintReport(props){
    const Values = this.props.location.state.value;
    return(
        <div>
            {Values}
        </div>
    );
}

export default PrintReport;