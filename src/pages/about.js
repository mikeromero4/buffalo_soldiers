
import React from "react"
import { Link } from "gatsby"
import { Featured, FeaturedItem,FeaturedItem__content,FeaturedItem__image,FeaturedItem__title } from "../components/molecules/featured/index"
import {Paper,Button,Box,List,ListItem} from "@material-ui/core"

import "./sidebar.scss";
let list = [
  {
    name:"history",
    list:[
      "Indian wars",
      "Johnson County",
      "World War 2"
    ]
  },
  {
    name:"national headquarters",
  },
  {
    name:"our mission",
  },
  {
    name:"executive board",
  },
  {
    name:"Hall of honor"
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
      <h1>Buffalo Soldier History</h1>
    <p>Buffalo Soldiers were members of the 10th Cavalry Regiment of the United States Army. This nickname was given to the Black Cavalry by Native American tribes who fought in the Indian Wars. The term eventually became synonymous with all of the African-American regiments formed in 1866</p>
   <img style = {{float:"left",marginRight:"24px"}} src = "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Buffalo_soldiers1.jpg/375px-Buffalo_soldiers1.jpg"/> During the Civil War, the U.S. government formed regiments known as the United States Colored Troops, composed of black soldiers and Native Americans. The USCT was disbanded in the fall of 1865. In 1867 the Regular Army was set at ten regiments of cavalry and 45 regiments of infantry. The Army was authorized to raise two regiments of black cavalry (the 9th and 10th (Colored) Cavalry) and four regiments of black infantry (the 38th, 39th, 40th, and 41st (Colored) Infantry), who were mostly drawn from USCT veterans. The first draft of the bill that the House Committee on Military Affairs sent to the full chamber on March 7, 1866 did not include a provision for regiments of black cavalry, however, this provision was added by Senator Benjamin Wade prior to the bill's passing on July 28, 1866.[8] In 1869 the Regular Army was kept at ten regiments of cavalry but cut to 25 regiments of Infantry, reducing the black complement to two regiments (the 24th and 25th (Colored) Infantry). The 38th and 41st were reorganized as the 25th, with headquarters in Jackson Barracks in New Orleans, Louisiana, in November 1869. The 39th and 40th were reorganized as the 24th, with headquarters at Fort Clark, Texas, in April 1869. The two black infantry regiments represented 10 percent of the size of all twenty-five infantry regiments. Similarly, the two black cavalry units represented 20 percent of the size of all ten cavalry regiments.[8]

During the peacetime formation years (1865-1870), the black infantry and cavalry regiments were composed of black enlisted soldiers commanded by white commissioned officers and black noncommissioned officers. These included the first commander of the 10th Cavalry Benjamin Grierson, the first commander of the 9th Cavalry Edward Hatch, Medal of Honor recipient Louis H. Carpenter, Nicholas M. Nolan. The first black commissioned officer to lead the Buffalo Soldiers and the first black graduate of West Point, was Henry O. Flipper in 1877.

From 1870 to 1898 the total strength of the US Army totaled 25,000 service members with black soldiers maintaining their 10 percent representation.[8]

History
 
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