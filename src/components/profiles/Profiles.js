import React, { Fragment, useEffect, useState } from "react";
// import Spinner from "../layout/Spinner";
import ProfileItem from "./ProfileItem";
import SearchIcon from "@mui/icons-material/Search";
import "./Profiles.css";
import { stockData } from "./data"

const Profiles = () => {
  const [profiles, setProfiles] = useState([]);
  const [chartData, setChartData] = useState([]);

  const [loading,setLoading] = useState(false)
    useEffect(() => {
      setLoading(true)
      fetch("https://api.airtable.com/v0/appBTaX8XIvvr6zEC/Users?api_key=key4v56MUqVr9sNJv")
        .then((res) => res.json())
        .then((data) => {
          const userData = data ? data.records ? data.records.map(i => i.fields) : [] : []
           let userCardData = []
           userData.forEach(d => {
           let dataConversion =  stockData.filter( i => i.user_id === d.Id && i.type === "conversion").length
           let dataImpression =  stockData.filter( i => i.user_id === d.Id && i.type === "impression").length
           let chartDataAll =  stockData.filter( i => i.user_id === d.Id && i.type === "conversion")
           setChartData(chartDataAll)
           const totalRevenue = stockData.filter( i => (i.user_id === d.Id)).reduce((accumulator, object) => {
            return accumulator + object.revenue;
          }, 0);
          let user = {
            ...d,
            Conversion : dataConversion,
            Impression : dataImpression,
            revenue : totalRevenue
          }
          userCardData.push(user)
           })
           setProfiles(userCardData);
          setLoading(false)
        })
        .catch((error) => {
          console.log(error);
          setLoading(false)
        });
    }, []);
  const [searchTerm, setSearchTerm] = useState("");
  return (
    <div>
       <h1 className="large text-primary"> Wellcome </h1>
      <div className="search">
        <div className="search__input">
          <SearchIcon className="search__inputIcon" />
          <input
            type="text"
            placeholder="Search By Name..."
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      {loading ? (
        <div className="large text-primary">loading</div>
      ) : (
        <Fragment>
          <div className="profiles">
            {profiles.length > 0 ? (
              profiles
                .filter((profile) => {
                  if (searchTerm === "") {
                    return profile;
                  } else if (
                    profile.Name
                      .toLowerCase()
                      .includes(searchTerm.toLocaleLowerCase())
                  ) {
                    return profile;
                  }
                })
                .map((profile) => (
                  <ProfileItem key={profile.id} profile={profile} chartData = {chartData} />
                ))
            ) : (
              <h4>No Profile Found...</h4>
            )}
          </div>
        </Fragment>
      )}
    </div>
  );
};

export default Profiles;
