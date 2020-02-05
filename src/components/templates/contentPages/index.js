
import React from "react"
import {Paper,Box,List,ListItem, Button} from "@material-ui/core"
import './style.scss'
import {Main,Section} from '../generic/common'
import {Link} from "gatsby"
import { Location } from "@reach/router"
import queryString from "query-string"
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { useMediaQuery } from 'react-responsive'


class Comp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {page:[0]}
        this.setPage = (page)=>{
          this.setState({page})
        }
    }

    render() {
     
      let{props:{list,name},state:{page},setPage} = this
        return ( <Location>
        {({ location, navigate }) => {
          let parameters = location.search
            ? queryString.parse(location.search)
            : { id: "events" }
console.log(parameters)
let[p1,p2]=parameters?.page?.split("_") || []
page = (p1? p2? [p1,p2]: [p1] : page)
          return (<>
            <Main sidebar = {<DynamicList {...{name,list,page,setPage} }/>}>
            <Section name = "intro" classes={['-transparent']}>
            <Box p = {this.props.small?1:3}>{page.length==1?"":<Link className = "t-postItem__back" to = {name + "?page=" + page[0]}><Button style={{color:'#ffffffd6'}}variant='contained' color='primary'><ArrowBackIcon/>{list[page[0]].name}</Button></Link>}
            <Paper><Box py={4}px = {this.props.small?1:8}>
            <Content {...{name,list,page}}/>
         </Box></Paper></Box>
            </Section>
            
            </Main>
            </>
            )
          }}
        </Location>
        );
        
    }
};
export default(props)=>{
  let small= useMediaQuery(
    {
    query: '(max-width: 780px)'
  })
  return <Comp {...props} small={small}/>
}
function  DynamicList({list,page,setPage,name}) {
  return <List style={{color:'#f8c40e'}}>
  {list.map((e,i)=><><Link to={name + "?page=" + i}><ListItem className = {"navigationListItem"} selected = {page[0]==i && page.length==1} button 
  onClick = {()=>{setPage([i])}} component="a" href='#test'>{e.name}
      
      </ListItem ></Link>
      {e.list?<div style = {{paddingLeft:"24px"}}>
        <List style={{color:'#ffffffcc'}}>{e.list.map((e2,i2)=><Link to={name + "?page=" + i+'_'+i2}>
        <ListItem className = {"navigationListItem"} 
        selected = {page[1]==i2 && page[0]==i} 
        button onClick = {()=>{setPage([i,i2])}} 
        component="a"
         href='#test'>{e2.name}
         </ListItem></Link>)}</List>
      </div>:""}
      </>)}


      </List>
}
function Content({list,page,name}) {
if (page.length==1){
  return <div className = "t-contentPage">
    <h1>{list[page[0]].name}</h1>
<h3>{list[page[0]].summary}</h3>
<hr/>
    <p>{list[page[0]].description}</p>
  </div>
}
  return <div className = "t-contentPage">

  <h1>{list[page[0]]?.list?.[page[1]]?.name}</h1>
<h3>{list[page[0]]?.list?.[page[1]]?.summary}</h3>
<hr/>
  <p><img src={list[page[0]]?.list?.[page[1]]?.hero} width={300}/>
{list[page[0]]?.list?.[page[1]]?.description}</p>
</div>


}