
import React from "react"
import { useMediaQuery } from 'react-responsive'
import {ButtonGroup,Button,Drawer} from '@material-ui/core'
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';import { navigate } from "gatsby"
import ListAltIcon from '@material-ui/icons/ListAlt';
import Event from '@material-ui/icons/Event';
import PersonIcon from '@material-ui/icons/Person';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import MenuIcon from '@material-ui/icons/Menu';
let image3= 'http://sandiegobuffalosoldiers.org/wp-content/uploads/2016/05/Buffalo-SD-logo2.jpg'
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
    name:"Youth",
    slug:"/junior-buffalo-soldiers/"
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

const Header = class extends React.Component {
  constructor(props) {
    super(props);
    this.state={open:false}
    this.toggle=(state)=>{
      this.setState({open:!this.state.open})
    }
  }

  render() {
    const { siteTitle,path,small } = this.props;
    return (<>
      <Drawer
      
              variant="temporary"
              anchor={"right"}
              open={this.state.open}
              onClose={this.toggle}
              ModalProps={{
                keepMounted: true // Better open performance on mobile.
              }}
              >
                <NavigationItems vertical className='secondaryNavigation' currentPage = {path} 
            handleChange = {handleChange} list = {secondaryNavigationItems}/>
                </Drawer>
      <header style={{position:'relative',zIndex:100}}>
   <div className='logo-tHolder' ><img className='logo -t' height={150} src={image3}/></div>
            {/* <PrimaryNavigation primary = {true} currentPage = {path} handleChange = {handleChange} list = {primaryNavigationItems}/> */}
            <NavigationItems className='primaryNavigation'  primary = {true} currentPage = {path} handleChange = {handleChange} list = {primaryNavigationItems
            .slice((small==false?0:1),primaryNavigationItems.length)}/>

    
          {small? <HamburgerMenu toggle={this.toggle}/>:<NavigationItems className='secondaryNavigation' currentPage = {path} 
            handleChange = {handleChange} list = {secondaryNavigationItems}/>}
    
      </header>
      </>
    )
  }
};
function HamburgerMenu({toggle}){
  return <Button onClick={toggle}>
    <MenuIcon/>
  </Button>
}
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
    orientation={props.vertical?'vertical':'horizontal'}
    variant={"fullWidth"} 
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
export default (props)=>{
  let small= useMediaQuery(
    {
    query: '(max-width: 680px)'
  })
  return <Header {...props} small={small}/>
}

function handleChange(path){
  console.log(path)
  navigate(path, {
    state: { test:'test' },
  })
}