import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"

import { navigate } from "gatsby"
import Paper from '@material-ui/core/Paper';
import PhoneIcon from '@material-ui/icons/Phone';

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
let image1 = "https://buffalosoldierar.com/wp-content/uploads/2019/04/trans_logo.png"

let primaryNavigationItems = [
  {
    name:"chapters",
    slug:"/chapters/"
  },
  {
    name:"Events",
    slug:"/Events/"
  },
  {
    name:"becomeamember",
    slug:"/becomeamember/"
  },
  {
    name:"Donate",
    slug:"/Donate/"
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
    name:"fiddlersgreen",
    slug:"/fiddlersgreen/"
  },
  {
    name:"chaplainscorner",
    slug:"/chaplainscorner/"
  },
  {
    name:"Reunion",
    slug:"/Reunion/"
  },
  {
    name:"store",
    slug:"/store/"
  },
]

const Header = ({ siteTitle,path }) => (
  <header>
         <NavigationItems primary = {true}currentPage = {path} handleChange = {handleChange} list = {primaryNavigationItems}/>
        <NavigationItems currentPage = {path} handleChange = {handleChange} list = {secondaryNavigationItems}/>
  </header>
)


function NavigationItems(props) {
  console.log(props.currentPage)
  return         <Paper><Tabs
  value={props.currentPage}
  onChange={function(_,index){
    handleChange(index)
  }}
 indicatorColor="primary"
 textColor="primary"
 centered
>
  {props.primary?<img height = "150px" src = {image1}/>:""}
  {
      props.list.map((e)=>
    <Tab icon={<PhoneIcon />} key={e.name} label={e.name} value={e.slug} />
  )
  }
</Tabs></Paper>
}
export default Header

function handleChange(path){
  console.log(path)
  navigate(path, {
    state: { test:'test' },
  })
}