import { useState, useEffect } from "react";
import { ExcelRenderer } from "react-excel-renderer";
import $ from "jquery";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import axios from "axios";
import EditPopup from "./EditPopup";
import Popup from "./Popup";
import Header from "./Header";
import Tabs from "@mui/material/Tabs";

import Tab from "@mui/material/Tab";

export function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && children}
    </div>
  );
}
function Home() {
  const [value, setValue] = useState(1);
  const [pendingTasks, setPendingTasks] = useState([]);
  const [inprogressTasks, setInprogressTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [show, setShow] = useState(false);
  const [passeddata, setpasseddata] = useState([]);

  useEffect(() => {
    // jquery for hide
    $("#addfile").hide();
    getAllData();
  }, []);

  const getAllData = () => {};

  const deleteHandler = (id) => {
    setPendingTasks(pendingTasks.filter((ele) => ele.id !== id));
    setCompletedTasks(completedTasks.filter((ele) => ele.id !== id));
  };

  const moveToInprogress = (data) => {
    setPendingTasks(pendingTasks.filter((ele) => ele.id !== data.id));
    setInprogressTasks([...inprogressTasks, data]);
  };
  const moveToCompleted = (data) => {
    setInprogressTasks(inprogressTasks.filter((ele) => ele.id !== data.id));
    setCompletedTasks([...completedTasks, data]);
  };
  const editHandler = (dataid, i) => {
    setShow(true);
    setpasseddata(dataid);
  };

  const closeMOdalHandler = () => {
    setShow(false);
    getAllData();
  };

  const getColumns = () => {
    switch (value) {
      case 1:
        return [
          "ID",
          "NAME",
          "START TIME",
          "END TIMES",
          "START DATE",
          "END DATE",
          "DESCRIPTION",
          "MOVE TO INPROGRESS",
          "EDIT",
          "DELETE",
        ];

      case 2:
        return [
          "ID",
          "NAME",
          "START TIME",
          "END TIMES",
          "START DATE",
          "END DATE",
          "DESCRIPTION",
          "MOVE TO COMPLETED",
        ];

      default:
        return [
          "ID",
          "NAME",
          "START TIME",
          "END TIMES",
          "START DATE",
          "END DATE",
          "DESCRIPTION",
          "DELETE",
        ];
    }
  };

  const handleChange = (ev, val) => {
    setValue(val);
  };
  return (
    <div>
      <Header
        getalldata={getAllData}
        setrows={setPendingTasks}
        rows={pendingTasks}
      />
      <>
        <div className="container home">
          <div className="row">
            <div className="col-md-9">
              <h3>Import and export</h3>
            </div>

            <div className="col-md-3" align="right">
              <ReactHTMLTableToExcel
                className="btn btn-info"
                table="details"
                filename="ReportExcel"
                sheet="Sheet"
                buttonText="Export"
              />
            </div>
          </div>
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="secondary"
            textColor="inherit"
            variant="fullWidth"
            aria-label="full width tabs example"
          >
            <Tab label="Pending Task" value={1} />
            <Tab label="Inprogress Task" value={2} />
            <Tab label="Completed task" value={3} />
          </Tabs>
          <TabPanel index={1} value={value}>
            <div className="row">
              <div className="col-md-12">
                <table class="table" id="details">
                  <thead>
                    <tr>
                      {getColumns().map((data) => (
                        <th scope="col" key={data}>
                          {data}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {pendingTasks.map((data, i) => (
                      <tr>
                        <td>{data.id}</td>
                        <td>{data.name}</td>
                        <td>{data.start_time}</td>
                        <td>{data.end_time}</td>
                        <td>{data.start_date}</td>
                        <td>{data.end_date}</td>
                        <td>{data.description}</td>
                        <td>
                          <i
                            class="fa fa-arrow-right cursor-pointer"
                            aria-hidden="true"
                            onClick={() => moveToInprogress(data)}
                          ></i>
                        </td>
                        <td>
                          <i
                            className="fa fa-edit cursor-pointer"
                            onClick={() => editHandler(data)}
                          ></i>
                        </td>
                        <td>
                          <i
                            className="fa fa-trash cursor-pointer"
                            onClick={() => deleteHandler(data.id)}
                          ></i>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <EditPopup
                  tasks={pendingTasks}
                  setTask={setPendingTasks}
                  show={show}
                  data={passeddata}
                  closeMOdalHandler={closeMOdalHandler}
                />
              </div>
            </div>
          </TabPanel>
          <TabPanel index={2} value={value}>
            <div className="row">
              <div className="col-md-12">
                <table class="table" id="details">
                  <thead>
                    <tr>
                      {getColumns().map((data) => (
                        <th scope="col" key={data}>
                          {data}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {inprogressTasks.map((data, i) => (
                      <tr>
                        <td>{data.id}</td>

                        <td>{data.name}</td>
                        <td>{data.start_time}</td>
                        <td>{data.end_time}</td>
                        <td>{data.start_date}</td>
                        <td>{data.end_date}</td>
                        <td>{data.description}</td>
                        <td>
                          <i
                            class="fa fa-arrow-right cursor-pointer"
                            aria-hidden="true"
                            onClick={() => moveToCompleted(data)}
                          ></i>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </TabPanel>
          <TabPanel index={3} value={value}>
            <div className="row">
              <div className="col-md-12">
                <table class="table" id="details">
                  <thead>
                    <tr>
                      {getColumns().map((data) => (
                        <th scope="col" key={data}>
                          {data}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {completedTasks.map((data, i) => (
                      <tr>
                        <td>{data.id}</td>
                        <td>{data.name}</td>
                        <td>{data.start_time}</td>
                        <td>{data.end_time}</td>
                        <td>{data.start_date}</td>
                        <td>{data.end_date}</td>
                        <td>{data.description}</td>

                        <td>
                          <i
                            className="fa fa-trash cursor-pointer"
                            onClick={() => deleteHandler(data.id)}
                          ></i>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </TabPanel>
        </div>
      </>
    </div>
  );
}

export default Home;
