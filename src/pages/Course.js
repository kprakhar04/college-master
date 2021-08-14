import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DataTable from "../components/DataTable";
import Spinner from "../components/Spinner";
import TopBar from "../components/TopBar";
import url from "../constants/Url";

const Course = () => {
  const { course } = useParams();
  console.log(course);
  const headings = ["S. No.", "Name", "Location", "Students", "Estd."];
  const [tableContents, setTableContents] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    axios
      .get(url + "/colleges/course/colleges", { params: { course } })
      .then((res) => {
        let apiData = [];
        let contents = [];
        console.log(res.data.data);
        apiData = res.data.data;
        let i = 1;
        apiData.forEach((data) => {
          let tempObj = {};
          tempObj["S. No."] = i;
          i = i + 1;
          tempObj["Name"] = data["name"] + " University";
          tempObj["Location"] = data["state"] + ", " + data["city"];
          tempObj["Students"] = data["noOfStudents"];
          tempObj["Estd."] = data["yearFounded"];
          tempObj["id"] = data["_id"];
          contents = [...contents, tempObj];
        });
        setTableContents(contents);
      })
      .catch((err) => {
        console.log(err);
      });
    setLoading(false);
  }, [course]);

  return loading ? (
    <Spinner />
  ) : (
    <div className="container">
      <TopBar home="" />
      <div className="row">
        <div className="col s12 l6 offset-l3 center-align">
          <h1
            className="flow-text text-primary shadow"
            style={{ marginTop: "18px" }}
          >
            Course : {course} || Colleges : {tableContents.length}
          </h1>
        </div>
      </div>
      <div className="row tableBg">
        <DataTable
          title="College List"
          headings={headings}
          data={tableContents}
          path={"/college"}
        />
      </div>
    </div>
  );
};

export default Course;
