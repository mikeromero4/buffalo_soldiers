import React from "react"
import { Paper, Box } from "@material-ui/core"

export default()=><div 
//  style = {{height:"400px",overflowY:"scroll"}} 
className = "presidentsPen">
 
 <Paper elevation = {4}>
    <Box  p = {8}>
  

  <div style = {{display:"flex"}}>
  <h3 className = "heading--2 -special">Greetings from Our President </h3>
  <div style = {{float:"left",position:"relative"}}>

 </div>
  </div>
  <President/>
   <p>On behalf of the Executive  Board and membership of the Ninth and Tenth (Horse) Cavalry Association, “The Buffalo Soldiers”, welcome to our official website.  Thank you for taking the time to visit this website and by doing so you honor those brave men and women who made great sacrifices for their country.  They are true American heroes! 
 </p>
 <p>We know you will find the site interesting and informative.  It has recently been redesigned and updated.  It is important to us that this site reflects the pride and distinguished service of those whose legacy we seek to preserve.  If there is something else that you would like to see or should you have questions, please don’t hesitate to let us know.
 </p>
 <p>We will highlight personalities, both living and dead whose contributions greatly impacted American history.  In addition to learning about the tremendous history of the Buffalo Soldiers, we look forward to keeping you abreast of Association projects, activities and events such as the unveiling of our national headquarters in Houston Texas in 2016 along with our sesquicentennial celebration.
 </p>
 <p>This is an exciting time for the Ninth and Tenth (Horse) Cavalry Association.  We have nearly forty active chapters across this nation involved in community activities uniquely designed with the goal of sharing this wonderful Buffalo Soldier history.   
 </p>
 <p>Finally, we invite you to join us as we continue to promote, perpetuate, and share the history and legacy of these true American heroes. We solicit your support and participation.
 </p>
 <Box justifyContent = "space-between" display = "flex" flexDirection = "row" >
 
 <p>
 “Answering The Call”
 <br/>Andre Q. Williams,  National President
 </p>
 <img style = {{marginRight:"100px"}} height = {150} src = "https://upload.wikimedia.org/wikipedia/en/f/f4/Timothy_Spall_Signature.png"/>
 </Box>
 
   </Box>
 
 </Paper>

 </div>

 function President() {
   return<><div style = {{float:"left"}}> <Box  height = {200} width = {200} position = "relative" borderRadius = "50%"  m = {2} overflow = "hidden">
   <img style={{position:"absolute",float:'right',width:"100%",top:"15px"}} src='https://i0.wp.com/www.910hcav.org/wp-content/uploads/2015/10/aw.jpg'/>
   
   </Box></div>

   </>
 }