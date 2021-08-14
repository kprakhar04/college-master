import React, { useState, useEffect } from "react";
import DataTable from "../components/DataTable";
import TopBar from "../components/TopBar";
import { useParams } from "react-router-dom";
import url from "../constants/Url";
import axios from "axios";
import Spinner from "../components/Spinner";

const State = () => {
  const headings = ["S. No.", "Name", "City", "Estd."];
  const { state } = useParams();

  const [tableContents, setTableContents] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get(url + "/colleges", {
        params: {
          state,
        },
      })
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
          tempObj["City"] = data["city"];
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
  }, []);

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
            State : {state} || Colleges : {tableContents.length}
          </h1>
        </div>
      </div>
      <div className="row tableBg">
        <DataTable
          title="List of Colleges"
          headings={headings}
          data={tableContents}
          path={`/college`}
        />
      </div>
    </div>
  );
};

export default State;
