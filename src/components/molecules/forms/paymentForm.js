import React from "react"
import Form from "./molecules/genericForm"
import { Box } from "@material-ui/core"
import Pay from "./molecules/payment"

let titles = [
    "",
    "Mr.",
    "Mrs.",
    "Trooper",
    "General",
    "Col",
    "Lt. Col.",
    "Major",
    "Sgt. Major",
    "Sgt.",
  ]
let fields = [
    {
        required:true,
        id: "first",
        name: "first name",
        sizes: { xs: 5, sm: 5 },
      },
    
      {
        required:true,
        id: "last",
        name: "last name",
        sizes: { xs: 5, sm: 5 },
      },
      {
        id: "prefix",
        name: "prefix",
        sizes: { xs: 2, sm: 2 },
        options: titles,
        helper: "(optional)",
      },
      {
        required:true,
        id: "email",
        name: "e-mail",
        sizes: { xs: 6, sm: 6, lg: 6 },
      },
      {
        id: "Chapter",
        name: "Chapter name",
        helper: "optional",
        sizes: { xs: 6, sm: 6, lg: 6 },
      },
]

export default class extends React.Component {
   constructor(props) {
     super(props);
   }
   componentDidMount(){
    let {setNextAction}=this.props.controller
  if(this.props.action){
    setNextAction(this.props.action(this.props.index,this.props.controller))
  }}
   render() {
     const { controller, index, title } = this.props;

     return (
       <div className="o-donations__content">
         <Box textAlign="center">
           <h3 className="o-donations__header">
             {title || "Enter your payment information:"}
           </h3>
         </Box>
         <Form {...{ controller, fields, index }} />
         <Pay {...{ controller , index }} />
       </div>
     );
   }
 };
