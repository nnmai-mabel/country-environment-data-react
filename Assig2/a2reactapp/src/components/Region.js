﻿import { Link } from "react-router-dom";

const Region = (props) => {

    return (
        <div className="card col-4 mb-5" style={{ width: 25 + 'rem' }}>
            <Link to={`/Countries/${props.regionId}`} className="">
                <img className="card-img-top" src={props.imageUrl} alt={"Image of " + props.regionName} />
                <div className="card-body">
                    <h5 className="card-title">{props.regionName}</h5>
                    <p className="card-text">Country Count: {props.countryCount}</p>
                </div>
            </Link>
        </div>
    )
}

export default Region
