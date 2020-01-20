import React from "react"
import {
  CardElement,
  injectStripe,
  Elements,
  StripeProvider,
} from "react-stripe-elements"

class InfoSection extends React.Component {
  constructor(props) {
    super(props)


    this.handleChange = this.handleChange.bind(this)
  }

componentDidMount(){
    let form = this.props.index

    let newData = {
        card: { valid:false,form,required:true },
      }
       this.props.controller.setData(newData,this.props.index)
  
}
  async handleChange(event) {
     let data = this.props.controller.data()[this.props.index]
    let form = this.props.index
    let token
    if(event.complete){
    token= (await this.props.stripe.createToken({ name: "Name" })).token
  console.log(token)  
  }
    let newData = {
      ...data,
      card: { valid:event.complete,value:token, form,required:true },
    }
     this.props.controller.setData(newData,this.props.index)
    // this.forceUpdate()
  }

  render() {
    return (
      <CardElement
        onChange={this.handleChange}
      />
    )
  }
}
let Tt=injectStripe(InfoSection)
export default ({ controller, title, additionalFields, append,index }) => {
  return (
    <StripeProvider apiKey="pk_live_IBJ2KJKhKasoN7D2iRp6YbxI0063zOaMbF">
      <Elements>
        <Tt
        index={index}
          append={append}
          title={title}
          additionalFields={additionalFields}
          controller={controller}
        />

      </Elements>
    </StripeProvider>
  )
}
