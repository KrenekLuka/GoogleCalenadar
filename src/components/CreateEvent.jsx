import React, { useState } from "react";
import ApiCalendar from "react-google-calendar-api";

const defaultDate = () => {
    let datetime = new Date();
    let month = (`0${datetime.getMonth() + 1}`).slice(-2);

    return `${datetime.getFullYear()}-${month}-${datetime.getDate()}T12:00`;
}

function CreateEvent(props){
    const [description, setDescription] = useState("");
    const [date, setDate] = useState(defaultDate());

    const handleSubmit = async () => {
        const timeZone = ":00+00:00";
        const event = {
          summary: description,
          start: {
            dateTime: `${date}${timeZone}`,
          },
          end: {
            dateTime: `${date}${timeZone}`,
          },
        };
    
        if (description !== "") {
          await ApiCalendar.createEvent(event);
          await props.listUpcomingEvents();
          setDescription("")
        }
        else {
            alert("Please add event description!")
        };
      };

    return(
        <div className="container row-margin-top create-event-border">
            <div className="row row-margin-bottom row-margin-top">
                <div className="col-2">
                    <label className="description-padding description-bold">
                            Create new event:
                    </label>
                </div>
            </div>
            <div className="row row-margin-bottom row-margin-top">
                <div className="col-2">
                    <label className="description-padding">
                        Description:
                    </label>
                </div>
                <div className="col">
                    <input
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="description-entry"
                        placeholder="Input event description"
                        />
                </div>
            </div>
            
            <div className="row row-margin-bottom">
                <div className="col-2">
                    <label className="description-padding">
                        Create date:
                    </label>
                </div>
                <div className="col">
                    <input
                        type="datetime-local"
                        id="start"
                        name="trip-start"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        />
                </div>
            </div>

            <div className="row row-margin-bottom">
                <div className="col-1 offset-2">
                    <button className="submit-button button-margin-top" onClick={handleSubmit}>Submit</button>
                </div>
            </div>
            
        </div>
    );

};

export default CreateEvent;