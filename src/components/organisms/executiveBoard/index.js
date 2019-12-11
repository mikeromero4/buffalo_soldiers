import React from "react"
import { GridList, GridListTile,Button,Paper,Card } from "@material-ui/core"

let executiveMembers = [
{
  role:"1st Vice President",	
  name:"Nina Amos",
},
{
  role:"2nd Vice President",	
  name:"Frank Bell",
},
// {
//   role:"Asst. 2nd Vice President",	
//   name:"Bruce Mitchell",
// },
// {
//   role:"Secretary",	
//   name:"Marilyn Johnson",
// },
// {
//   role:"Asst. Secretary",	
//   name:"Diane Butler",
// },
{
  role:"Treasurer",	
  name:"Larry Thornton",
},
// {
//   role:"Asst. Treasurer",	
//   name:"Leanna Rogers",
// },
{
  role:"Parliamentarian",	
  name:"Roy Achong",
},
// {
//   role:"Asst. Parliamentarian",	
//   name:"Clint Brown",
// },
{
  role:"Sargent-at-Arms",	
  name:"Virgil Griffin",
},
// {
//   role:"Asst. Sargent-at-Arms",	
//   name:"Henry Black",
// },
{
  role:"Chaplin",	
  name:"Eddie Sumbler",
},
// {
//   role:"Asst. Chaplin",	
//   name:"Fred Gray",
// },
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
  <div className = "cardGrid">
{
  <GridList cellHeight={'auto'} spacing = {16} cols={4}>
  {executiveMembers.map(e => (
    <GridListTile  cols={1}>
      <Card>
        <h1>{e.name}</h1>
    <span>{e.role}</span>
    </Card>'s'
    </GridListTile>
  ))}
</GridList>
  
}
<Button variant = "contained" fullWidth color = "primary"> Full List</Button>
  </div>
  </Paper>