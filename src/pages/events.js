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
import Confirm from "../components/molecules/forms/confirmEvent"

import PaymentForm from "../components/molecules/forms/paymentForm"
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
      monthId: date.getMonth(),
      time: time.slice(0, 4) + time.slice(7, time.length),
    }
  }
  function eventExtractor(event,index) {
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
      index,
      name,
      date,
      location,
      membersOnly,
      price,
      locationName,
      description: documentToReactComponents(description,{
        renderNode: {
          'embedded-asset-block': (node) =>
            <img style = {{float:"left"}} width = {200} class="img-fluid" src={`${node.data.target.fields.file.url}`}/>
        }
      }),
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
      filters:[],
      range:{},
      page: "events",
    }
    this.resetFilters=()=>{
      this.setState({
        ...this.state,
        filters:[],
        range:{},
      })
    }


    this.filterManager={
      addFilter:(newFilter)=>{
        this.setState({filters:[...this.state.filters,newFilter]})
      },
      removeFilter:(removedFilter)=>{
        let filters=[...this.state.filters]
        let index
        filters.forEach((e,i)=>{
          if(e.name==removedFilter.name){
            index=i
          }
        })
        if(index!==undefined){
          filters.splice(index,1)
          this.setState({filters})
        }
        
      },
      setRange:(range)=>{
        this.setState({range})
      },
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
    console.log(this.state)
    const { props } = this
    let events=applyFilters(this.state.events,[this.state.range,...this.state.filters])
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
                    sidebar={<Filters filterManager={this.filterManager} events={this.state.events} />}
                  >
                    {this.state.loaded ? 
                    events.length==0?'No events to display. Try changing your filters.'
                    :(
                      <Events resetFilters={this.resetFilters} setPage={this.setPage} data={events} />
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
function applyFilters(events,filters){
  if(filters.length==0){return events}
  let filteredEvents=[]
  events.forEach((event)=>{
    let filtered=false
    console.log(filters)
    filters.forEach(({filter})=>{
      if(filter && filter(event)){filtered=true}
    })
    if(filtered==false){filteredEvents.push(event)}
  })
  console.log(filteredEvents)
  return filteredEvents
}
class EventPage extends React.Component {
  constructor(props) {
    super(props)
    this.dataHook=this.dataHook.bind(this)
           this.paymentAction=function(index, controller) {
      let allData = controller.allData()
     let{card:{value:{id:card}}} = (allData)
     
     return [{
       url:"https://lzt188jvx2.execute-api.us-east-1.amazonaws.com/v1",
       input:{card},
       action:'charge',
       index,
     },
       function(allData) {
         console.log(allData)
         let error
         if(allData.type=="StripeCardError"){error=allData.raw.message;return { error,redirectTo:1 }}
         let body = {order:{...allData}
         }
         return { body, error }
       },
     ]
   }.bind(this)
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
                 
<br/>
<Controller dataHook = {this.dataHook}>
    <PaymentForm name='payment'/>

    
    <Confirm actionRequest={this.paymentAction} name='confirm'/>
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
  [
    {
      name:"members only",
      filter:(e)=>{
if(e.membersOnly){return false}
return true
      }
    }, 
    {
      name:"free",
      filter:(e)=>{
        if(e.price>0){return true}
        return false

      }
    }
  ],
  [{
    name:"this month",
    filter:(e)=>{
      if(e.date[0].monthId==1){return false}
      return true
    }
  }, 
  {
    name:"next month",
    filter:(e)=>{
      if(e.date[0].monthId==2){return false}
      return true
    }
  }, 
  {
    name:"this year",
    filter:(e)=>{
      if(e.date[0].year==2020){return false}
      return true
    }
  }, 
  {
    name:"next year",
    filter:(e)=>{
      if(e.date[0].year==2021){return false}
      return true
    }
  }],

]
function updateMonth(data) {
  console.log(this)
}
class Filters extends Component {
  render() {
    console.log(this.props)
    let { events,filterManager } = this.props
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
              <Checkbox 
              onChange={(e2)=>{
                if(e2.target.checked==true){
                  console.log('add'+e.name)
                  filterManager.addFilter(e)
                }
                else{
                  console.log('remove'+e.name)
                  filterManager.removeFilter(e)
                }
              }}/>
              {e.name}
            </div>
          ))}
          Time Range:
          <RadioGroup
            onChange={(e)=>{
              console.log(e.target.value)
              let selected=(filters[1].find((e2)=>e2.name==e.target.value))
              filterManager.setRange(selected)
            }}
            defaultValue="this year"
            color="secondary"
            aria-label="gender"
            name="customized-radios"
          >
            {filters[1].map(e => (
              <div>
                <FormControlLabel
                  labelPlacement="end"
                  value={e.name}
                  control={<Radio color="secondary" />}
                  label={e.name}
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
function Events({ data, setPage,resetFilters }) {
  let events = ""
  console.log(data)
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
                    onClick={()=> {
resetFilters()
                      setPage(e.index)
                    }}
                    to={"events?id=" + e.index}
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
