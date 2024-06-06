import React, { useState, useEffect } from "react";
import secureLocalStorage from "react-secure-storage";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "./Sheduler.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import Home from "../Home";

const Modal = (props) => {
  const [handle, setHandle] = useState("");

  //state for selectOption

  //const [select, setSelect] = useState("");

  // onChange for select
  // const selectOnchange = (e) => {
  //   const optionChange = e.target.value;
  //   setSelect(optionChange);
  // };
  // console.log("select", select);

  const handleChange = (e) => {
    setHandle(e.target.value);
  };

  useEffect(() => {
    props.modalState && props.setRecieve({});
  }, [props.modalState]);

  const handleSaveData = () => {
    if (handle !== "") {
      props.setModalState(false);
      props.setSaveData((prev) => [
        ...prev,
        { ...props.startEndDate, title: '-', content: handle},
        //{ ...props.startEndDate, title: '', content: handle, status: select },
      ]);
    } else {
      props.setModalState(true);
      alert("Please create Notes")
    }
  };

  return (
    
    <div className={`modal display-1`}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              Private Notes
            </h5>
          </div>
          <div className="modal-body" >
            <form>
              <div className="mb-3">
                <label htmlFor="message-text" className="col-form-label ">
                  Write your notes:
                </label>
                <textarea    
                style={{height:200}}            
                  className="form-control notebook"
                  id="message-text"
                  onChange={handleChange}
                  value={
                    props.filteredData
                      ? props.filteredData.content
                      : props.recieve.content
                  }
                /> 

              </div>
            </form>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
              onClick={() => props.setModalState(false)}
            >
              Close
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleSaveData}
            >
              Scure notes
            </button>
          </div>
        </div>
      </div>
      {/* <div
        className="table table-dark table-responsive-sm"
        style={{
          width: 600,
          marginLeft: "30%",
          height: 180,
          borderRadius: 10,
        }}
      >
        <table>
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Notes</th>
              <th scope="col">Status</th>
              <div style={{ marginLeft: 10 }}>
                <button
                  type="button"
                  className="btn btn-secondary mt-1 btn-sm"
                  data-bs-dismiss="modal"
                  onClick={() => props.setModalState(false)}
                >
                  X
                </button>
              </div>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">1</th>
              <td>
                <input
                  style={{ height: 30, width: 380, borderRadius: 5 }}
                  className="form-control notbook"
                  id="message-text"
                  onChange={handleChange}
                  value={
                    props.filteredData
                      ? props.filteredData.content
                      : props.recieve.content
                  }
                />
              </td>
              
              <td>
                <div>
                  <select
                    onChange={selectOnchange}
                    style={{
                      height: 30,
                      border: "hidden",
                      borderRadius: 5,
                      outline: "none",
                    }}
                    className="form-select "
                    aria-label="Disabled select example"
                    value={props.recieve?.status}
                  >
                    <option selected>Select Status</option>
                    <option value="Done">Done</option>
                    <option value="Pending">Pending</option>
                  </select>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <div
          style={{
            display: "flex",
            flexDirection: "row-reverse",
            padding: "10px",
          }}
        >
          <button
            type="button"
            className="btn btn-primary btn-sm mt-4"
            onClick={handleSaveData}
          >
            Secure
          </button>
        </div>
      </div> */}
    </div>
  );
};

function Celendar() {
  const localizer = momentLocalizer(moment);
  const [modalState, setModalState] = useState(false);
  const [recieve, setRecieve] = useState();
  const [filteredData, setFilteredData] = useState({});
  const [value, onChange] = useState();
  const [saveData, setSaveData] = useState(
    secureLocalStorage.getItem("notes") != null
      ? JSON.parse(secureLocalStorage.getItem("notes"))
      : [
          {
            title: "",
            //content: "",
            //status: "",
            start: new Date(),
            end: new Date(Date()),
          },
        ]
  );
  const [startEndDate, setStartEndDate] = useState({
    start: "",
    end: "",
  });

  // localStorag
  useEffect(() => {
    secureLocalStorage.setItem("notes", JSON.stringify(saveData));
  }, [saveData]);

  // find & dependencies
  useEffect(() => {
    setFilteredData(saveData.find((e) => e.start == recieve?.start));
  }, [saveData, recieve]);

  const calendarStyle = (date) => {
    let currentDate = `${new Date().getDate()} ${
      new Date().getMonth() + 1
    } ${new Date().getFullYear()}`;
    let allDate = `${date.getDate()} ${
      date.getMonth() + 1
    } ${date.getFullYear()}`;
    if (allDate === currentDate)
      return {
        style: {
          backgroundColor: "#3174ad",
        },
      };
  };
  useEffect(() => {
    setFilteredData({});
  }, [startEndDate]);

  const event = (e) => {
    setRecieve(e);
    setModalState(true);
    setStartEndDate({ start: e.start, end: e.end });
  };
  const handleSelectedEvent = (event) => {
    setModalState(true);
    const { start, end } = event;
    setStartEndDate({ start: start, end: end });
    saveData.filter((event) => event.start >= start && event.start < end);
  };

  return (
    <div>
      {modalState && (
        <Modal
          setModalState={setModalState}
          startEndDate={startEndDate}
          saveData={saveData}
          setSaveData={setSaveData}
          recieve={recieve}
          modalState={modalState}
          setRecieve={setRecieve}
          filteredData={filteredData}
        />
      )}
      <Calendar
        className={`${modalState ? "overlay" : ""}`}
        localizer={localizer}
        events={saveData}
        onSelectEvent={(e) => event(e)}
        startAccessor="start"
        endAccessor="end"
        dayPropGetter={calendarStyle}
        style={{
          height: 500,
          marginLeft: 350,
          marginRight: 350,
          marginTop: 50,
          backgroundColor:"#defcfa",
          border: "2px solid balck"
        }}
        onSelectSlot={(slotInfo) => handleSelectedEvent(slotInfo)}
        selectable
        popup={true}
        onChange={onChange}
        value={value}
      />
      <Home/>
    </div>
  );
}
export default Celendar;
