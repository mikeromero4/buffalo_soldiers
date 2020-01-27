import React from "react"
import SEO from "../components/utilities/seo"
import PaymentForm from "../components/molecules/forms/paymentForm"
import Confirm from "../components/molecules/forms/confirm2"
import Donate from "../components/molecules/forms/donate"
import Controller from "../components/molecules/forms/controller"
import { Box, Paper } from "@material-ui/core"
import { Main } from "../components/templates/generic/common"
import img from "../images/bg1.png"
import "./donate.scss"

export default class extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.dataHook = this.dataHook.bind(this)
  }
  dataHook(data) {
    this.setState({ data: data })
  }

  render() {
    return (
      <>
        {" "}
        <SEO title="Page two" />
        <Main margin flush>
          <div className="l-topSection">
            <div className="l-topSection__seperation">
              <p className="o-donations__note -t">
                Want to honor our loved ones and living Troops, or those who
                have gone to Fiddlers Green? consider a Memorial donation to the
                9th & 10th (Horse) Cavalry Association in their name. All
                Memorial Donations will help support our New National
                Headquarters that proudly honors our Buffalo Soldiers.
              </p>
            </div>
          </div>
          <div
            style={{
              backgroundSize: "cover",
              backgroundImage: "url(" + img + ")",
            }}
          >
            <Box margin="auto" p={4} width={800}>
              <Paper>
                <Box p={2}>
                  <Controller dataHook={this.dataHook}>
                    <Donate name="donation" />
                    <PaymentForm name="info" />
                    <Confirm name="confirm" />
                  </Controller>
                </Box>
              </Paper>
            </Box>
          </div>
          <div className="o-donations__note">
            <img
              className="o-donations__image"
              src="https://i0.wp.com/www.910hcav.org/wp-content/uploads/2017/05/A-Salute-To-Our-Heroes-630x452.png?resize=300%2C215&ssl=1"
            />

            <p>
              By supporting the National Association, you have the opportunity
              to honor a special person or pay tribute to someone you love by
              making a memorial donation where you can help make a difference in
              the lives of deserving veterans, the Buffalo Soldiers. A gift in
              honor of a memorial donation is a unique way to acknowledge that
              extraordinary individual in your life. Your donation helps us to
              continue to educate, perpetuate and celebrate the history and
              heritage of GREAT American Heros.
            </p>
          </div>
        </Main>
      </>
    )
  }
}
