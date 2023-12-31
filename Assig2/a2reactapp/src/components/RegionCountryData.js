﻿// regionCountryData contain regionImageUrl, regionName, cityName, countryName, iso3, cityCount, countryCount
const RegionCountryData = (regionCountryData) => {
    return (
        <div className="row justify-content-center">
            <div className="image-container">

                {/*Set default image if null available*/}
                {regionCountryData.regionImageUrl !== null && regionCountryData.regionImageUrl !== "" ? (
                    <img src={regionCountryData.regionImageUrl} className="card-img" alt={regionCountryData.regionName} />
                ) : (
                    <img src="https://e0.pxfuel.com/wallpapers/1010/550/desktop-wallpaper-light-earth-planet-for-section-%D0%BA%D0%BE%D1%81%D0%BC%D0%BE%D1%81-beautiful-planet-earth.jpg" className="card-img" alt={regionCountryData.regionName} />
                )}

                {/*Show region and country data*/}
                <div className="text-overlay">
                    <div className="left-column">
                        {regionCountryData.cityName !== null && regionCountryData.cityName !== "" ? (
                            <h1>{regionCountryData.cityName}</h1>
                        ) : ""}
                        <h3>{regionCountryData.countryName} {regionCountryData.iso3 ? `(${regionCountryData.iso3})` : ""}</h3>
                        <h5>{regionCountryData.regionName}</h5>
                        <div className="mt-5">
                            <div className="mb-5">
                                <p>Number of Cities: {regionCountryData.cityCount}</p>
                                <p>Countries in the same Region: {regionCountryData.countryCount}</p>
                            </div>
                        </div>
                    </div>
                    <div className="right-column">
                        <img src={regionCountryData.imageUrl} className="card-img" alt={regionCountryData.countryName} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RegionCountryData