import React from "react"
import { Box} from "@material-ui/core"


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
    const {
      props,
    } = this;

    let d1 = props.controller.allData()
    let { first, last, email,shipping ,order} = d1

    let{street,city,state} = shipping
    let card = d1.card.value.card.last4
    let shippingmm=order.items[order.items.length-1].amount/100
    console.log(props.items)
    let total=props.items.reduce((p,c)=>p+c.price*c.quantity,0)/100
    let tax=order.items[order.items.length-2].amount*.01
    let gtotal = order.amount/100
    return (
      <div className="o-donations__content">
        <Box p={2} textAlign="center">
          <h3 className="o-donations__holder o-donations__header -lg"> Confirm Order</h3>
          <div className="o-donations__holder -t2">

            <br /> <p className="o-donations__header -secondary">Personal Info:</p>

            <div> 
            Name: {first.value + " " + last.value}
            <br /> Address: {`${street}, ${city},  ${state}`}
            <br />
            E-mail: {email.value}
            </div>
            </div>
            <div className="o-donations__holder -t2">

<br /> <p className="o-donations__header -secondary">PaymentMethod:</p>   
<div>  
 {"****-****-****-" + card}
  </div>
  </div>
            <div className="o-donations__holder -t2">

          <br /> <p className="o-donations__header -secondary">Payment:</p>   
          <div>  
          subtotal: ${total}
         <br/> tax: ${tax}
         <br/> shipping: ${shippingmm}

          
            </div>
            </div>

 <p className="o-donations__header -secondary">Grand total: ${gtotal}</p>   


        </Box>
      </div>
    )
  }
};