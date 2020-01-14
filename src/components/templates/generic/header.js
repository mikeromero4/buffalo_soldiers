import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"

import {ButtonGroup,Button} from '@material-ui/core'
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';import { navigate } from "gatsby"
import ListAltIcon from '@material-ui/icons/ListAlt';
import Event from '@material-ui/icons/Event';
import PersonIcon from '@material-ui/icons/Person';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
let image1 = "https://buffalosoldierar.com/wp-content/uploads/2019/04/trans_logo.png"
let image2= 'https://mark.trademarkia.com/logo-images/ericdouglas-johnson/buffalo-soldiers-77881209.jpg'
let image3= 'http://sandiegobuffalosoldiers.org/wp-content/uploads/2016/05/Buffalo-SD-logo2.jpg'
let image4 ='https://i.pinimg.com/originals/dc/99/7f/dc997fcf965fc1e1c631e4f4185f2c03.jpg'
let primaryNavigationItems = [
  {
    name:'',
    slug:'/',
    icon:<img className='logo' height={150} src={image3}/>
      },
  {
    name:"chapters",
    slug:"/chapters/",
    icon:<ListAltIcon/>,
    dropdown:['test','test2']
  },
  {
    name:"Events",
    slug:"/events/",
    icon:<Event/>
  },

  {
    name:"Membership",
    slug:"/membership/",
    icon:<PersonIcon/>

  },

  {
    name:"Donate",
    slug:"/donate/",
    icon:<AttachMoneyIcon/>
  },
]
let secondaryNavigationItems = [

  {
    name:"Home",
    slug:"/"
  }, 
   {
    name:"about",
    slug:"/about/"
  },
  {
    name:"News",
    slug:"/news/"
  },

  {
    name:"fiddlers green",
    slug:"/fiddlers_green/"
  },
  {
    name:"Junior Buffalo Soldiers",
    slug:"/about/"
  },
    {
    name:"Store",
    slug:"/store/"
  },
  {
    name:"Discount Travel",
    slug:"/discount_travel/",

  },
]

const Header = ({ siteTitle,path }) => (
  <header style={{position:'relative',zIndex:100}}>

        {/* <PrimaryNavigation primary = {true} currentPage = {path} handleChange = {handleChange} list = {primaryNavigationItems}/> */}
        <NavigationItems  primary = {true} currentPage = {path} handleChange = {handleChange} list = {primaryNavigationItems}/>


        <NavigationItems currentPage = {path} handleChange = {handleChange} list = {secondaryNavigationItems}/>

  </header>
)
function PrimaryNavigation(props) {
  return <div style={{background:'#0a2f55'}}>

  {
      props.list.map((e)=>{
        if(e.dropdown){
          return <ButtonGroup size="small" variant="outlined" color="secondary" aria-label="split button">
            <Button variant="outlined" size="small" color="secondary" key={e.name} onClick={function(){navigate(e.slug)}}>{e.icon}{e.name}</Button>
          <Button
          variant="outlined"
            color="secondary"
            size="small"
            aria-label="select merge strategy"
            aria-haspopup="menu"
          >
            <ArrowDropDownIcon />
          </Button>
   </ButtonGroup>
        }
    else{return<Button color="secondary"
    size="small"
    aria-label="select merge strategy"
    aria-haspopup="menu" variant="outlined" icon={e.icon} key={e.name} label={e.name} onClick={function(){navigate(e.slug)}}>{e.icon}{e.name}</Button>}
      })
  }
</div>
}



function NavigationItems(props) {
  return <div style={{boxShadow: '2px 2px 9px #00000091'}}>

    <Tabs
    variant={props.primary?'standard':"fullWidth"} 
    indicatorColor={props.primary?'primary':"secondary"}
  value={props.currentPage}
  onChange={function(_,index){
    handleChange(index)
  }}
 textColor={props.primary?'primary':"secondary"}
 
>
  {
      props.list.map((e)=>{
        if(e.dropdown){
          return <Tab  icon={e.icon} key={e.name} label={e.name} value={e.slug} as={
            <ButtonGroup variant="contained" color="primary" aria-label="split button"/>
          }>
            <Button>rrr</Button>
          <Button
            color="primary"
            size="small"
            aria-controls={true ? 'split-button-menu' : undefined}
            aria-expanded={true ? 'true' : undefined}
            aria-label="select merge strategy"
            aria-haspopup="menu"
          >
            <ArrowDropDownIcon />
          </Button>
          </Tab>
        }
    else{return<Tab  icon={e.icon} key={e.name} label={e.name} value={e.slug} />}
      })
  }
</Tabs></div>
}
export default Header

function handleChange(path){
  console.log(path)
  navigate(path, {
    state: { test:'test' },
  })
}