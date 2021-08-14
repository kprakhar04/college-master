import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import DataTable from "../components/DataTable";
import Spinner from "../components/Spinner";
import TopBar from "../components/TopBar";
import url from "../constants/Url";

const CollegeInfo = ({ fromCourse }) => {
  const { id } = useParams();
  const [collegeInfo, setCollegeInfo] = useState({});
  const [similarColleges, setSimilarColleges] = useState([]);
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);
  const [activeid, setActiveId] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setActiveId(id);
    setLoading(true);
    axios
      .get(url + `/colleges/college/${id}`)
      .then((res) => {
        setCollegeInfo(res.data.data.college);
        setCourses(res.data.data.college.courses);
        setSimilarColleges(res.data.data.similarColleges);
        let studentData = res.data.data.college.students;
        let contents = [];
        let i = 1;
        for (let student of studentData) {
          const temp = {};
          temp['S. No.'] = i;
          temp['Name'] = student['name'];
          temp['Course Name'] = student['courseName'];
          temp['Batch'] = student['yearOfBatch'];
          temp['id'] = student['_id'];
          contents = [...contents, temp];
          i++;
        }
        setStudents(contents);
      })
      .catch((err) => {
        console.log(err);
      });
    setLoading(false);
  }, [id]);
  console.log(collegeInfo);
  console.log(courses);
  console.log(similarColleges);
  const headings = ['S. No.', 'Name', 'Course Name', 'Batch'];

  return loading ? (
    <Spinner />
  ) : (
    <>
      <div className="container">
        <TopBar home="/" />
        <div className="row  collegeInfo">
          <div className="row">
            <div className="col s12 l6 left-align">
              <h1 className="">{collegeInfo.name} University</h1>
            </div>
            <div className="col s12 l6 right-align">
              <h6>Estd. {collegeInfo.yearFounded}</h6>
              <h6>
                Location : {collegeInfo.city}, {collegeInfo.state},{" "}
                {collegeInfo.country}
              </h6>
              <h6>
                Courses Offered :{" "}
                {courses.map((course, idx) => (
                  <span key={idx}>
                    {course}
                    {idx !== courses.length - 1 && ", "}
                  </span>
                ))}
              </h6>
              <h6> Students : {collegeInfo.noOfStudents} </h6>
            </div>
          </div>
        </div>

        <div className="row tableBg">
          <DataTable
            title="Enrolled Students"
            headings={headings}
            data={students}
            path={"/student"}
          />
        </div>
        <div className="row">
          <ul class="collection with-header">
            <li class="collection-header">
              <h6><b>Suggested Colleges</b></h6>
            </li>
            <div className="similar">
              {similarColleges.map((college, idx) => {
                return (
                  <Link
                    to={`/college/${college._id}`}
                    key={idx}
                    class="collection-item text-secondary"
                  >
                    {college.name}
                  </Link>
                );
              })}
            </div>
          </ul>
        </div>
      </div>
    </>
  );
};

export default CollegeInfo;
