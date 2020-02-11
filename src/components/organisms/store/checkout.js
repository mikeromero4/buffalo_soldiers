import React from "react"

import AddressForm from "../../molecules/forms/address"

import Confirm from "../../molecules/forms/confirm"
import PaymentForm from "../../molecules/forms/paymentForm"
import Controller from "../../molecules/forms/controller"

import Send from "../../molecules/forms/sendOrder"

import Contact from "../../molecules/forms/contact"
import "./style.scss"

export default class Card1 extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data: {},
    }
    let cart = toArray(this.props.cart)
    console.log(cart)
    this.itemData = cart.map(e => ({
        sku: e.variation.sku,
        price: e.variation.price,

        name: e.item.name,
        quantity: e.quantity,
        size: e.variation.size,
      }))
    this.dataHook = this.dataHook.bind(this)
    this.purchase = this.purchase.bind(this)
    this.addressAction=function(index, controller) {
      
      return [{
        url:"https://lzt188jvx2.execute-api.us-east-1.amazonaws.com/v1",
        input:{items:this.itemData,...controller.data([index])},
        action:'verifyShipping',
        index,
      },
        function(allData) {
          let [data,data2]=allData
          data=JSON.parse(data)
          console.log(data)
          let error
          if (data.type == "ShippoAPIError") {
            error = JSON.parse(data.detail).__all__[0]
          }
          if (data?.validation_results?.is_valid === false) {
            error = data.validation_results.messages[0].text
          }
          let { street1: street, city, zip, state } = data
          let body = {shipping:{street,city,zip,state,
            valid: data?.validation_results?.is_valid},
            order:{...data2 }
          }
          return { body, error }
        },
      ]
    }.bind(this)
     this.shippingAction=function(index, controller) {
       let allData = controller.allData()
      let{order:{id:order},card:{value:{id:card}}} = (allData)
      let shipping = allData.order.shipping_methods.reduce((p,c)=>({...(Math.min(p.amount,c.amount)==p.amount?p:c)}),{amount:1000})
      console.log(shipping.id)
      console.log(allData)

      console.log(order)
      return [{
        url:"https://lzt188jvx2.execute-api.us-east-1.amazonaws.com/v1",
        input:{order,shipping:shipping.id},
        action:'ship',
        index,
      },
        function(allData) {
          console.log(allData)
          let error
          let body = {order:{...allData}
          }
          return { body, error }
        },
      ]
    }.bind(this)

    this.paymentAction=function(index, controller) {
      let allData = controller.allData()
     let{order:{id:order},card:{value:{id:card}}} = (allData)
     
     return [{
       url:"https://lzt188jvx2.execute-api.us-east-1.amazonaws.com/v1",
       input:{order,card},
       action:'pay',
       index,
     },
       function(allData) {
         console.log(allData)
         let error
         if(allData.type=="StripeCardError"){error=allData.raw.message;return { error,redirectTo:1 }}
         let body = {order:{...allData}
         }
         return { body, error }
       },
     ]
   }.bind(this)

  }
  dataHook(data) {
    this.setState({ data: data })
  }
  purchase() {
    checkOut(this.props.cart, this.state.data.card.id)
  }
  render() {
    return (
      <div className="checkout__payment">
        <h2>Checkout</h2>

        <Controller message = "We've received your order and have e-mailed you a receipt. Your package should arrive 5 - 7 days. Thank you!" dataHook={this.dataHook}>
          <AddressForm name="address" actionRequest={this.addressAction}/>
          <PaymentForm name="payment" actionRequest={this.shippingAction}/>
          {/* <Send name="payment"/> */}

          {/* <Contact name='contact'/> */}
          <Confirm
          actionRequest={this.paymentAction}
          items={this.itemData}
            name="confirm"
            // fields={[
            //   {name:[getfirst,' ',getLast]},
            //   {email:[getEmail]},
            //   {Payment_method:['****-****-****-',getLastFour]}
            // ]}
          />
        </Controller>
        <button onClick={this.purchase}>click me</button>
      </div>
    )
  }
}

function checkOut(items, card) {
  let cart = toArray(items)
  // cart.forEach((e)=>{
  //   totalPrice+=e.variation.price*e.quantity
  //   totalItems+=e.quantity
  // })

  console.log(cart)
  let itemData = cart.map(e => ({
    sku: e.variation.sku,
    quantity: e.quantity,
    size: e.variation.size,
  }))
  console.log(itemData)
  let session = fetch(
    "https://lzt188jvx2.execute-api.us-east-1.amazonaws.com/v1",
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        action: "pay",
        input: {
          card: card,
          items: itemData,
        },
      }),
    }
  ).then(function(response) {
    return response.json()
  })
  session.then(
    function(data) {
      console.log("success")

      console.log(data)
    },
    function(err) {
      console.log(err)
    }
  )
}

function toArray(object) {
  let array = []
  for (const i in object) {
    array.push({ id: i, ...object[i] })
  }
  return array
}
