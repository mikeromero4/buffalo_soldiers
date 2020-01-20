import React from "react"
import { Box} from "@material-ui/core"


export default props => {
  let d1 = props.controller.allData()
    let { first, last, email } = d1
    let{shipping} = d1
    console.log(shipping)
    let{street,city,state} = shipping
    let card = d1.card.value.card.last4
    return (
      <div className="o-donations__content">
        <Box p={2} textAlign="center">
          <h3 className="o-donations__holder o-donations__header -lg"> Confirm Donation</h3>
          <p className="o-donations__holder">
            <br /> <p className="o-donations__header -secondary">name:</p> {first.value + " " + last.value}
            <br /> <p className="o-donations__header -secondary">address:</p> {`${street}, ${city},  ${state}`}
            <br /> <p className="o-donations__header -secondary">PaymentMethod:</p> {"****-****-****-" + card}
            <br />
            <p className="o-donations__header -secondary">email:</p>{email.value}
            </p>
        </Box>
      </div>
    )
  }