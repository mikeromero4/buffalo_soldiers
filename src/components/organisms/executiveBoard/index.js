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
  role:"Secretary",	
  name:"Marilyn Johnson",
},
{
  role:"Asst. Secretary",	
  name:"Diane Butler",
},
{
  role:"Treasurer",	
  name:"Larry Thornton",
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
export default()=><Paper>
  <h1 className='heading--4'>
  executive board:
  </h1>
  <br/>
   <br/>
  <div style = {{width:"100%",height:"100%"}} className = "cardGrid">
{
  <GridList cellHeight={'auto'} spacing = {16} cols={1}>
  {executiveMembers.map(e => (
    <GridListTile  cols={1}>
      <Card>
        <CardActionArea>
         
        <CardContent>
        <h1 className = "heading--4">{e.name}</h1>
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