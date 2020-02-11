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
    let { first, last, email,donation} = d1

    let card = d1.card.value.card.last4
    
    return (
      <div className="o-donations__content">
        <Box p={2} textAlign="center">
          <h3 className="o-donations__holder o-donations__header -lg"> Confirm Order</h3>
          <div className="o-donations__holder -t2">

            <br /> <p className="o-donations__header -secondary">Personal Info:</p>

            <div> 
            Name: {first.value + " " + last.value}
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

  <p className="o-donations__header -secondary">Donation Amount: ${donation.value}.00</p>   


        </Box>
      </div>
    )
  }
};