
import React from "react"
import { Link } from "gatsby"
import { Featured, FeaturedItem,FeaturedItem__content,FeaturedItem__image,FeaturedItem__title } from "../components/molecules/featured/index"
import {Paper,Button,Box,List,ListItem} from "@material-ui/core"

import "./sidebar.scss";
let list = [
  {
    name: "All news",
    list:[
      "chaplains corner",
      "news bulletin",
      "Chapter news",
      "Newsletter",
    ]
  },
 
]
export default () => (
  <Main sidebar = {<List>
    {list.map((e)=><><ListItem button component="a" href='#test'>{e.name}
        
        </ListItem>
        {e.list?<div style = {{paddingLeft:"24px"}}>
          <List>{e.list.map((e2)=><ListItem button component="a" href='#test'>{e2}</ListItem>)}</List>
        </div>:""}
        </>)}
    
    
        </List>}>
    <Section name = "intro" classes={['-transparent']}>
    <Box p = {2}><Paper><Box p = {4}>
      <h1>News</h1>
    <p>Buffalo Soldiers were members of the 10th Cavalry Regiment of the United States Army. This nickname was given to the Black Cavalry by Native American tribes who fought in the Indian Wars. The term eventually became synonymous with all of the African-American regiments formed in 1866</p>
<p>chaplains corner news</p>

 
 </Box></Paper></Box>
    </Section>
    
    </Main>
)
function Section({sidebar,name,children,classes}) {
  if (sidebar){
return <div id = {name} className = {"t-section -withSidebar"
+(classes?' '+classes.reduce((p,c)=>p+c):'')}>
<div className="t-section__sidebar">
{sidebar}
</div>
<div className="t-section__content">
  {children}
</div>
</div>
  }
else return <div id = {name} className = {"t-section"+(classes?' '+classes.reduce((p,c)=>p+c):'')}>{children}</div>
}

function Main({children,sidebar}) {
return <main className={"t-main" + (sidebar?" -withSidebar":"")}>
  {sidebar?<div className = "t-main__sidebar">{sidebar}</div>:""}
  <div className = "t-main__content">{children}</div>
</main>
}