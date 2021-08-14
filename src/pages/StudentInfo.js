import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Spinner from "../components/Spinner";
import TopBar from "../components/TopBar";
import url from "../constants/Url";

const StudentInfo = () => {
  const [studentInfo, setStudentInfo] = useState({});
  const { id } = useParams();

  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get(url + "/students", {
        params: {
          _id: id,
        },
      })
      .then((res) => {
        console.log(res.data.data);
        setStudentInfo(res.data.data[0]);
        setSkills(res.data.data[0].skills);
      })
      .catch((err) => {
        console.log(err);
      });
    setLoading(false);
  }, []);

  console.log(studentInfo);
  console.log(skills);

  return loading ? (
    <Spinner />
  ) : (
    <div className="container">
      <TopBar home="/" />
      <div className="row valign-wrapper">
        <div className="col s12 l6 offset-l3 center-align studentInfo">
          <h1 className="flow-text">Name : {studentInfo.name}</h1>
          <div className="zoom">
            <div className="row">
              <div className="col s12">
                {" "}
                <h6>Reg. No. : {studentInfo.id}</h6>
              </div>
              <div className="col s12">
                {" "}
                <h6>Batch : {studentInfo.yearOfBatch}</h6>
              </div>
              <div className="col s12">
                {" "}
                <h6>Course Name : {studentInfo.courseName}</h6>
              </div>
              <div className="col s12">
                {" "}
                <h6>
                  Skills :{" "}
                  {skills.map((skill, idx) => (
                    <span key={idx}>
                      {skill}
                      {idx !== skills.length - 1 && ", "}
                    </span>
                  ))}
                </h6>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentInfo;
