import React, { useState, useEffect } from "react";
import ApiCalendar from "react-google-calendar-api";
import CreateEvent from "./CreateEvent";
import { XCircleFill } from 'react-bootstrap-icons';


function UpcomingEventsList() {
  const [itemList, setItemList] = useState([]);
  const [granularity, setGranularity] = useState("7");  
  

  const listUpcomingEvents = async () => {
    const date = new Date();
    date.setDate(date.getDate() + Number(granularity));

    await ApiCalendar.listUpcomingEvents().then((result) => {
      setItemList(
        result.result.items.filter(
          (x) =>
            new Date(x.start.dateTime) <= date || new Date(x.start.date) <= date
        )
      );
    });
  };

  const deleteEntry = async (id) => {
    await ApiCalendar.deleteEvent(id);
    setItemList(itemList.filter((x) => x.id !== id));
  };

  useEffect(() => {
    listUpcomingEvents();
  }, [granularity]);


  return (
      <div className="container">
        <div className="row">
            <CreateEvent listUpcomingEvents={listUpcomingEvents}/>
        </div>
        <div className="row">
          <div className="row justify-content-center">
            <div className="col-2 range-width">
              <label>Select day range:</label>
            </div>
            <div className="col-2">
                <select
                    className="select-size"
                    name="granularity"
                    onChange={(e) => setGranularity(e.target.value)}
                  >
                    <option value="7">7</option>
                    <option value="1">1</option>
                    <option value="30">30</option>
                  </select>
              </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-8">
              {itemList.map((x) => (
                <div className="row row-list-item" key={x.id}>
                    <div className="col">{x.summary}</div>
                    <div className="col">{x.start.dateTime.replace('T', ' ').split('+')[0] ?? `${x.start.date} 00:00`}</div>                    
                    <div className="col-auto"><XCircleFill className="delete-item-button" onClick={() => deleteEntry(x.id)}/></div>                    
                </div>
              ))}
             </div> 
            </div>
          </div>
      </div>
  );
}

export default UpcomingEventsList;