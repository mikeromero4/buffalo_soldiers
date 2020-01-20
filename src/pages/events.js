import React, { Component } from "react"
import { Link } from "gatsby"
import SEO from "../components/utilities/seo"
import ScheduleIcon from '@material-ui/icons/Schedule';
import PlaceIcon from '@material-ui/icons/PlaceOutlined';
import InfoIcon from '@material-ui/icons/InfoOutlined';
import {
  Box,
  Button,
  Input,
  Select,
  FormControl,
FormHelperText,
InputLabel,
  Option,
  Paper,
  Checkbox,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@material-ui/core"
import Confirm from "../components/molecules/forms/confirm"

import PaymentForm from "../components/molecules/forms/paymentInformation"
import Controller from "../components/molecules/forms/controller"

import { Main, Section } from "../components/templates/generic/common"
import "../style/events.scss"
import Calendar from "react-calendar"
import { Location } from "@reach/router"
import queryString from "query-string"

import "../style/calendar.scss"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
const contentful = require("contentful")
let ml = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
]
let ms = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "June",
  "July",
  "Aug",
  "Sept",
  "Oct",
  "Nov",
  "Dec",
]
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
]

let key = "eWhI0H7MtQjMVqh1Z8BvS8XpZTgE5sEcyMyyu23W6SE"
const client = contentful.createClient({
  space: "an8q9497b29q",
  accessToken: key,
})

function processEvents(data) {
  function formatDate(date) {
    let time = date.toLocaleTimeString("en-US")
    return {
      reference: date,
      date: date.getDate(),
      day: days[date.getDay()],
      year: date.getFullYear(),
      month: ml[date.getMonth()],
      time: time.slice(0, 4) + time.slice(7, time.length),
    }
  }
  function eventExtractor(event) {
    let {
      startTime,
      endTime,
      name,
      description,
      location,
      locationName,
      membersOnly,
      price,
      photo,
    } = event.fields
    let date = [formatDate(new Date(startTime)), formatDate(new Date(endTime))]
    return {
      name,
      date,
      location,
      membersOnly,
      price,
      locationName,
      description: documentToReactComponents(description),
      image: photo.fields.file.url,
    }
  }
  let events = data.toPlainObject().items.map(eventExtractor)
  console.log(events)
  return events
}

export default class extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      events: [],
      loaded: false,
      page: "events",
    }
    this.dataHook=this.dataHook.bind(this)
    this.setPage = this.setPage.bind(this)
  }
  dataHook(data){
    this.setState({data:data})
  }
  componentDidMount() {
    let component = this
    client
      .getEntries({ content_type: "event", order: "fields.startTime" })
      .then(response => {
        component.setState({ events: processEvents(response), loaded: true })
      })
      .catch(console.error)
  }
  setPage(page) {
    this.setState({
      page: page,
    })
  }
  render() {
    const { props } = this
    return (
      <Location>
        {({ location, navigate }) => {
          let page = location.search
            ? queryString.parse(location.search)
            : { id: "events" }

          return (
            <>
              <SEO title="Page two" />
              <Main margin flush className="eventPage">
                <div className="l-topSection">
                  <div className="l-topSection__seperation">
                    <h2 className="heading--2 ut-gold heading--special1">
                      {page.id == "events"
                        ? "Upcoming Events"
                        : this.state.events.length > 1
                        ? this.state.events[page.id].name + " / RSVP"
                        : "loading event..."}
                    </h2>
                  </div>
                </div>
                {page.id == "events" ? (
                  <Section
                    classes={["-transparent", " eventPage"]}
                    sidebar={<Filters events={this.state.events} />}
                  >
                    {this.state.loaded ? (
                      <Events setPage={this.setPage} data={this.state.events} />
                    ) : (
                      <div style={{ padding: "12px", textAlign: "center" }}>
                        loading events...
                      </div>
                    )}
                  </Section>
                ) : this.state.events.length > 1 ? (
                  <EventPage event={this.state.events[page.id]} />
                ) : (
                  "loading event..."
                )}
              </Main>
            </>
          )
        }}
      </Location>
    )
  }
}
class EventPage extends React.Component {
  constructor(props) {
    super(props)
    this.dataHook=this.dataHook.bind(this)
  }
  dataHook(data){
    this.setState({data:data})
  }
  componentDidMount() {
    document.body.scrollTop = 0
    // or
    window.scrollTo(0, 0)
  }

  render() {
    const { event } = this.props
    let key = "AIzaSyBi8HYhLfAHJ1SebXf7Bz2Q05h0L8ho-Vg"
    let url = `https://maps.googleapis.com/maps/api/staticmap?
center=${event.location.lat},${event.location.lon}
&zoom=11
&markers=red|small|${event.location.lat},${event.location.lon}
&size=500x300
&maptype=roadmap
&key=${key}
`
    let link = `https://www.google.com/maps/search/?api=1&query=${event.location.lat},${event.location.lon}&query_place_id=empowering success now`
    let [startDate, endDate] = formatDuration(event.date)
    return (
      <>
        <div className="singleEvent">
          <div className="top">
            <div className="eventInformation">
             <div className="event__imageHolder">
             <div
                className="event__image -large"
                style={{ backgroundImage: "url(" + event.image + ")" }}
              ></div>
             </div>
            
                        <div className='description'> Details: <br/>{event.description}</div>
                        <div className='bottom'>
                     {/* <div className='ticketAmount'> <span>  How many tickets would you like to reserve?</span><div style={{width:'100px'}}>
                           <FormControl fullWidth color="primary" variant="standard ">
                  <InputLabel htmlFor={"input"}>{'tickets'}</InputLabel>
                        
 <Select
 // onChange={this.handleChange}
 inputProps={{name:'tickets2'}}
  id={'input'}
 native
    fullWidth
  //  value={undefined}
   variant="standard"
    name={'input'}
  >
  <option             
  value={undefined}></option>
  <option             
  value={1}>2</option>
  <option             
  value={2}>3</option>
  <option             
  value={3}>4</option>
</Select></FormControl></div></div> */}
<br/>
<Controller dataHook = {this.dataHook}>
    <PaymentForm name='payment'/>
    <Confirm name='confirm'/>
  </Controller>
    </div>
            </div>
            <div className="RSVP"><div>

            <div className="info">
                <div><ScheduleIcon/>
                  <span>
                    {startDate} - {endDate}{" "}
                  </span>
                </div>
                <div><InfoIcon/>
                Tickets {event.price==0 || event.price ==undefined ?'are free':`cost: $${event.price}.00`}
                 <br/> This event is{" "}
                  {event.membersOnly
                    ? "for members only"
                    : "open to the public"}
                </div>
                <div><PlaceIcon/>
                Location: <a target='_blank' href={link}> {event.locationName}</a>
                <a target='_blank' href={link}>
                <img src={url} />
              </a>
                </div>

              </div>
              
                    </div>
                    
            </div>
          </div>
   
        </div>
      </>
    )
  }
}
let filters = [
  ["members only", "free"],
  ["this month", "next month", "this year", "next year", "last year"],
]
function updateMonth(data) {
  console.log(this)
}
class Filters extends Component {
  render() {
    let { events } = this.props
    return (
      <>
        <Calendar
          tileClassName={function({ date }) {
            if (
              events.some(e => {
                let eventDates = e.date
                return inRange(eventDates, date)
              })
            ) {
              return ["test"]
            }
            return
          }}
          calendarType="US"
        />
        <div className="filters">
          Filters:
          {filters[0].map(e => (
            <div>
              <Checkbox />
              {e}
            </div>
          ))}
          Time Range:
          <RadioGroup
            defaultValue="this year"
            color="secondary"
            aria-label="gender"
            name="customized-radios"
          >
            {filters[1].map(e => (
              <div>
                <FormControlLabel
                  labelPlacement="end"
                  value={e}
                  control={<Radio color="secondary" />}
                  label={e}
                />
              </div>
            ))}
          </RadioGroup>
        </div>
      </>
    )
  }
}
function inRange(eventDates, date) {
  return (
    (eventDates[0].reference < date && date < eventDates[1].reference) ||
    eventDates.some(
      e =>
        e.reference.getDate() == date.getDate() &&
        e.reference.getMonth() == date.getMonth() &&
        e.reference.getFullYear() == date.getFullYear()
    )
  )
}
function Events({ data, setPage }) {
  let events = ""
  if (data.length > 0) {
    events = data.map((e, i) => {
      let [startDate, endDate] = formatDuration(e.date)
      return (
        <div className="event">
          <div className="event__title">{e.name}</div>

          <div className="event__holder">
            <div
              className="event__image"
              style={{ backgroundImage: "url(" + e.image + ")" }}
            ></div>
            <div className="event__body">
              <div className="event__description">
                <div>
                  <span>
                    {startDate} - {endDate}{" "}
                  </span>
                </div>
                <div className="info">{e.description}</div>
                <br />
              </div>
                <div className="event__buttons">
                  <Link
                    onClick={function() {
                      setPage(i)
                    }}
                    to={"events?id=" + i}
                  >
                    <Button fullWidth color="secondary" variant="contained">
                      More Info / Rsvp
                    </Button>
                  </Link>
                </div>
            </div>
          </div>
        </div>
      )
    })
  }
  return <>{events}</>
}

function formatDuration(date) {
  let start, end
  //single day
  if (
    date[1].date == date[0].date &&
    date[1].month == date[0].month &&
    date[1].year == date[0].year
  ) {
    let suffixes = date.map(e => e.time.slice(e.time.length - 2, e.time.length))
    // different suffixes (am /pm)
    start = `${date[0].month} ${date[0].date}, ${date[0].time}`
    end = date[1].time
    // same suffix (am /pm)
    if (suffixes[0] == suffixes[1]) {
      start = start.slice(0, start.length - 2) //remove first suffix
    }
  }
  //multiple days
  else {
    start = `${date[0].month} ${date[0].date} (${date[0].time})`
    end = `${date[1].month} ${date[1].date} (${date[1].time})`
  }
  return [start, end]
}
