import React, { useState, useEffect } from "react";
import secureLocalStorage from "react-secure-storage";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "./Sheduler.css";
import "react-big-calendar/lib/css/react-big-calendar.css";

const Modal = (props) => {
  const [handle, setHandle] = useState("");

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
        { ...props.startEndDate, title: "-", content: handle },
        //{ ...props.startEndDate, title: '', content: handle, status: select },
      ]);
    } else {
      props.setModalState(true);
      alert("Please create Notes");
    }
  };

  return (
    <div className={`modal display-1`}>
      <div className="modal-dialogg">
        <div className="modal-content">
          <div className="toast-header mt-2 align-items-center justify-content-center">
            <h5 >You Should LogIn First.</h5>
            <div className="btn">
            <button
              type="button"
              class="ml-3 mb-1 close"
              data-dismiss="toast"
              aria-label="Close"
              onClick={() => props.setModalState(false)}
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          </div>
        </div>
      </div>
  </div>
  );
};

function CopyCelendar() {
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
          width: 650,
          marginTop: 40,
          backgroundColor: "#defcfa",
        }}
        onSelectSlot={(slotInfo) => handleSelectedEvent(slotInfo)}
        selectable
        popup={true}
        onChange={onChange}
        value={value}
      />
    </div>
  );
}
export default CopyCelendar;
