import React from "react"
import { Box} from "@material-ui/core"


export default props => {
    let { donation, personalInfo } = props.controller.data()
    let { first, last, email } = personalInfo
    console.log(personalInfo)
    return (
      <div className="o-donations__content">
        <Box p={2} textAlign="center">
          <h3 className="o-donations__header -lg"> Confirm Donation</h3>
          <p className="o-donations__header -secondary">
            Donation amount: ${donation}.00
            <br /> name: {first.value + " " + last.value}
            <br />
            email:{email.value}
          </p>
        </Box>
      </div>
    )
  }