﻿import { useState, useEffect } from 'react'
import { Link, useParams } from "react-router-dom";
import Country from "./Country"

const CountryList = ({ }) => {

    // useParams() to get regionId from url
    let params = useParams();

    // If use useState() to initialise regionId, the page will keep the state (the value) -> the regionId stays the same
    // after re-rendering. However, if only use a normal variable, the page won't be re-rendered and won't keep the
    // value after reloading
    const regionId = params.regionId ?? 0; // set regionId to the URL regionId parameter, if empty, default as 0

    // Set initial regionData to empty object
    const [regionData, setRegionData] = useState({});

    // Set initial countryData to empty array
    const [countryData, setCountryData] = useState([]);

    // Set inital query for searching countries in the region
    const [query, setQuery] = useState('');

    {/*data fetched is an object, need to access the key "countryList", which is an array of object, then map to array in return*/ }
    useEffect(() => {
        fetch(`http://localhost:5256/api/B_Countries/CountryList/${regionId}?searchText=${query}`)
            .then(response => response.json())
            .then(data => {
                setCountryData(data.countryList)
                setRegionData(data.theRegion)
            })
            .catch(err => {
                console.log(err);
            });
    }, [regionId, query]) // regionId is a reactive value and needs to change on a re-render -> put in dependency list

    //Create the searchQuery() function after the useEffect hook to capture the textbox text value then use it to update the query state
    function searchQuery(evt) {
        const value = document.querySelector('[name="searchText"]').value;
        setQuery(value);
    }

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="card bg-dark text-black" style={{ width: 25 + 'rem', padding: 0, margin: 10, border: 0, position: 'relative' }}>

                    {/*Set a default image if it is null*/}
                    {regionData.imageUrl !== null && regionData.imageUrl !== "" ? (
                        <img src={regionData.imageUrl} className="card-img" alt={regionData.regionName} />
                    ) : (
                        <img className="card-img" alt={regionData.regionName} src="https://e0.pxfuel.com/wallpapers/1010/550/desktop-wallpaper-light-earth-planet-for-section-%D0%BA%D0%BE%D1%81%D0%BC%D0%BE%D1%81-beautiful-planet-earth.jpg" />
                    )}

                    {/*Show region information*/}
                    <div className="card-img-overlay" style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                        <h2 className="card-title" style={{ marginBottom: 20, color: '#0079a2' }}>{regionData.regionName}</h2>
                        <p className="card-text">Number of Countries: {regionData.countryCount}</p>
                    </div>
                </div>
            </div>

            <div className="row justify-content-center">
                <div className="bg-success py-1 mb-2">
                    <h2 className="text-center">Countries in {regionData.regionName}</h2>
                </div>

                {/*Show alert for number of countries matched the search*/}
                <div className="alert alert-success" role="alert">
                    {`There ${countryData.length === 1 ? "is" : "are"} ${countryData.length}
                    ${countryData.length === 1 ? "country that matches" : "countries that match"}  your search in ${regionData.regionName} region.`}
                </div>
            </div>

            <div>
                <div className="row py-1 mb-2">
                    <div className="col-md-3 ml-0 mb-2 text-start">
                        <Link to={`/RegionList`} className="btn btn-warning">Back to Regions</Link>
                    </div>
                    <div className="col-md-5 mb-2">
                        <input type="text" name="searchText" className="form-control" placeholder="Search Countries" />
                    </div>
                    <div className="col-md-2 mb-2">

                        {/*Attach a ReactJS event to the button called “searchQuery” using the ReactJS syntax onClick={searchQuery}*/}
                        <button type="button" className="btn btn-primary" onClick={searchQuery}>Search</button>
                    </div>
                </div>
            </div>
            <div className="row justify-content-center">
                
                {/*Map through each object to get data*/}
                {countryData.length > 0 ? (
                    countryData.map((obj) => (
                        <Country
                            key={obj.countryId}
                            countryId={obj.countryId}
                            countryName={obj.countryName}
                            iso3={obj.iso3}
                            imageUrl={obj.imageUrl}
                            cityCount={obj.cityCount}
                            emissionDataYearRange={obj.emissionDataYearRange}
                            temperatureDataYearRange={obj.temperatureDataYearRange}
                            regionId={regionData.regionId}
                            regionImageUrl={regionData.imageUrl}
                            regionName={regionData.regionName}
                            countryCount={regionData.countryCount}
                        />
                    )
                    )
                ) : (
                    ""
                )}
            </div>
        </div >
    )
}

export default CountryList