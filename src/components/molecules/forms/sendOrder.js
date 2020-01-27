import React from "react"
import Form from "./molecules/genericForm"
import { Box } from "@material-ui/core"
import Pay from "./molecules/payment"

let fields = [
  {
    required: true,
    id: "address-line1",
    name: "address",
    options:[1,2,3],
    sizes: { xs: 6, sm: 6 },
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
let shipping=controller.data()[0].order.shipping_methods.reduce((p,c)=>({...(Math.min(p.amount,c.amount)==p.amount?p:c)}),{amount:1000})
     return (
       <div className="o-donations__content">
         <Box textAlign="center">
           <h3 className="o-donations__header">
             {title || "Enter your shipping address:"}
           </h3>
         </Box>
         shipping method:{shipping.description} ${shipping.amount}
         <Form {...{ controller, fields, index }} />
       </div>
     );
   }
 };
