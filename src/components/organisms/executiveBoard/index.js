import React from "react"
import {CardContent,CardActionArea, GridList, GridListTile,Button,Paper,Card } from "@material-ui/core"
       
import PersonIcon from '@material-ui/icons/Person';
let executiveMembers = [
{
  role:"1st Vice President",	
  name:"Nina Amos",
},
{
  role:"2nd Vice President",	
  name:"Frank Bell",
},
{
  role:"Asst. 2nd Vice President",	
  name:"Bruce Mitchell",
},
{
  role:"Treasurer",	
  name:"Larry Thornton",
},
{
  role:"Secretary",	
  name:"Marilyn Johnson",
},
{
  role:"Asst. Secretary",	
  name:"Diane Butler",
},

{
  role:"Asst. Treasurer",	
  name:"Leanna Rogers",
},
{
  role:"Parliamentarian",	
  name:"Roy Achong",
},
{
  role:"Asst. Parliamentarian",	
  name:"Clint Brown",
},
{
  role:"Sargent-at-Arms",	
  name:"Virgil Griffin",
},
{
  role:"Asst. Sargent-at-Arms",	
  name:"Henry Black",
},
{
  role:"Chaplin",	
  name:"Eddie Sumbler",
},
{
  role:"Asst. Chaplin",	
  name:"Fred Gray",
},
{
  role:"Color Guard Commander",	
  name:"George Noland",
},
{
  role:"Quartermaster ",	
  name:"Samuel Pitts",
},
]
export default(props)=><Paper>
  <h1 style = {{padding:"12px"}} className='ut-gold heading--3'>
  executive board:
  </h1>
  <div style = {{width:"100%",height:"100%"}} className = "cardGrid">
{
  <GridList cellHeight={'auto'} spacing = {4} cols={props.cols||1}>
  {executiveMembers.map(e => (
    <GridListTile  cols={1}>
      <Card>
        <CardActionArea>
         
        <CardContent>
        <h3>{e.name}</h3>
          <span>{e.role}</span>
    
    </CardContent>
    
    </CardActionArea>
    </Card>
    </GridListTile>
  ))}
</GridList>
  
}
{/* <Button variant = "contained" fullWidth color = "secondary"> Full List</Button> */}
  </div>
  </Paper>