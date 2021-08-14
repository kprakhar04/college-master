import React, { useEffect, useState } from "react";
import StateGraph from "../components/StateGraph";
import CourseGraph from "../components/CourseGraph";
import axios from "axios";
import url from "../constants/Url";
import ICON from "../assets/logo192.png";
import Spinner from "../components/Spinner";

const Home = () => {
  const [courseNames, setCourseNames] = useState([]);
  const [courseTot, setCourseTot] = useState([]);
  const [stateNames, setStateNames] = useState([]);
  const [stateTot, setStateTot] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get(url + "/colleges/courses")
      .then((res) => {
        setCourseNames(Object.keys(res.data.data.courses));
        setCourseTot(Object.values(res.data.data.courses));
        setStateNames(Object.keys(res.data.data.state));
        setStateTot(Object.values(res.data.data.state));
      })
      .catch((err) => {
        console.log(err);
      });
    setLoading(false);
  }, []);
  return (
    <div className="container">
      <div className="row">
        <div className="col l6 s12 offset-l3 center-align">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <h1 className="flow-text text-primary shadow">COLLEGE MASTER</h1>{" "}
            <img src={ICON} alt="icon" height="40px" />
          </div>
        </div>
      </div>
      {loading ? (
        <Spinner />
      ) : (
        <div className="row">
          <div className="col s12">
            <StateGraph labels={stateNames} dataValues={stateTot} />
          </div>
          <div className="col  s12">
            <CourseGraph labels={courseNames} dataValues={courseTot} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
