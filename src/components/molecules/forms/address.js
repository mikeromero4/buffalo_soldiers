import React from "react"
import Form from "./molecules/genericForm"
import { Box } from "@material-ui/core"
import Pay from "./molecules/payment"

let fields = [
  {
    required: true,
    id: "address-line1",
    name: "address",
    sizes: { xs: 6, sm: 6 },
  },

  {
    required: true,
    id: "city",
    name: "city",
    sizes: { xs: 6, sm: 6 },
  },
  {
    id: "state",
    name: "state",
    sizes: { xs: 4, sm: 4 },
  },
  {
    required: true,
    id: "zip",
    name: "zip",
    sizes: { xs: 4, sm: 4, lg: 4 },
  },
  {
    required:true,
    id: "country",
    name: "country",
    options: ["","US"],
    sizes: { xs: 4, sm: 4, lg: 4 },
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
             {title || "Enter your shipping address:"}
           </h3>
         </Box>
         <Form {...{ controller, fields, index }} />
       </div>
     );
   }
 };
