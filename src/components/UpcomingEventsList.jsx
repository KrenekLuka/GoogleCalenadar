import React, { useState, useEffect } from "react";
import ApiCalendar from "react-google-calendar-api";

function UpcomingEventsList() {
  const [date, setDate] = useState("2022-02-17T12:00");
  const [description, setDescription] = useState("");
  const [itemList, setItemList] = useState([]);
  const [granularity, setGranularity] = useState("7");

  const handleSubmit = async () => {
    const timeZone = ":00+00:00";
    const event = {
      summary: description,
      description: "demo of create event function",
      start: {
        dateTime: `${date}${timeZone}`,
      },
      end: {
        dateTime: `${date}${timeZone}`,
      },
    };

    if (description !== "") {
      await ApiCalendar.createEvent(event);
      listUpcomingEvents();
    }
  };

  const listUpcomingEvents = async () => {
    const date = new Date();
    date.setDate(date.getDate() + Number(granularity));
    console.log(date);

    await ApiCalendar.listUpcomingEvents().then((result) => {
      setItemList(
        result.result.items.filter(
          (x) =>
            new Date(x.start.dateTime) <= date || new Date(x.start.date) <= date
        )
      );
    });
  };

  useEffect(() => {
    listUpcomingEvents();
  }, [granularity]);

  const deleteEntry = async (id) => {
    await ApiCalendar.deleteEvent(id);
    setItemList(itemList.filter((x) => x.id !== id));
  };

  return (
    <>
      <label>
        Description:
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </label>
      <label>
        Create date:
        <input
          type="datetime-local"
          id="start"
          name="trip-start"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </label>
      <button onClick={handleSubmit}>Submit</button>

      <label>Select range:</label>
      <select
        name="granularity"
        onChange={(e) => setGranularity(e.target.value)}
      >
        <option value="7">7</option>
        <option value="1">1</option>
        <option value="30">30</option>
      </select>

      {itemList.map((x) => (
        <div key={x.id}>
          <span>
            <p>
              Event name: {x.summary} Date: {x.start.dateTime ?? x.start.date}
              <button onClick={() => deleteEntry(x.id)}>Delete Entry</button>
            </p>
          </span>
        </div>
      ))}
    </>
  );
}

export default UpcomingEventsList;
