import React from "react"
import { Box, Button, TextField } from "@material-ui/core"

let donations = [5, 10, 25, 50, 100, 250, 500]


export default class extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    let { donation } = this.props.controller.data()
    return (
      <div className="o-donations__content">
        <h1 className="ut-gold heading--special1"> Donate Now</h1>
        <Box p={2} textAlign="center">
          <h3 className="o-donations__header">
            {" "}
            How much would you like to Donate?
          </h3>
          <p>
            Donate $50 or more to be added to perpetual Plaque which will hang
            proudly in our Headquarters office in the National Buffalo Soldier
            Museum.
          </p>
        </Box>
        <Box display="flex" justifyContent="space-between">
          {donations.map(e => (
            <Button
              color="primary"
              variant={
                this.props.controller.data().donation != e
                  ? "outlined"
                  : "contained"
              }
              onClick={function() {
                this.forceUpdate()
                this.props.controller.setProgress(1)
                this.props.controller.setData({ donation: e })
              }.bind(this)}
            >
              ${e}.00
            </Button>
          ))}
        </Box>
        <br />

        <div
          className="o-donations__amount"
          style={{ background: "#000g", padding: "12px" }}
        >
          Donate ${" "}
          <TextField
            label="amount*"
            placeholder="amount*"
            color="primary"
            variant="filled"
            startAdornment={<div>$</div>}
            value={Math.max(0, Math.min(donation, 2000))}
            type="number"
            onChange={function(e) {
              this.forceUpdate()
              this.props.controller.setProgress(1)
              this.props.controller.setData({ donation: e.target.value })
            }.bind(this)}
          ></TextField>
        </div>
      </div>
    )
  }
}