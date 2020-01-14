import React from "react"

import AddressForm from "../../molecules/forms/address"
import PaymentForm from "../../molecules/forms/paymentInformation"
import Controller from "../../molecules/forms/controller"
import "./style.scss"

export default class Card1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data:{}
    }
    this.dataHook = this.dataHook.bind(this)
    this.purchase = this.purchase.bind(this)
  }
dataHook(data){
  this.setState({data:data})
}
purchase(){
  console.log(this.state.data.card.id)
  checkOut(this.props.cart,this.state.data.card.id)
}
  render() {
    return <div className="checkout__payment">
      <h2>Checkout</h2>
  {/* <br/>Cart Subtotal: $25.00
  <br/>Shipping: $4:99
  <br/>Tax: $1.78
  <br/>
  <br/><h3>Total: $31.77</h3> */}

  <Controller dataHook = {this.dataHook}>
    <AddressForm name='address'/>
    <PaymentForm/>
    <PaymentForm/>
  </Controller>
<button onClick = {this.purchase}>click me</button>
    </div>
  }
}


function checkOut( items,card) {
  let cart = toArray(items)
  // cart.forEach((e)=>{
  //   totalPrice+=e.variation.price*e.quantity
  //   totalItems+=e.quantity
  // })

  console.log(cart)
  let itemData = cart.map((e)=>({
    sku:e.variation.sku,
    quantity:e.quantity,
    size:e.variation.size
  }))
console.log(itemData)
  let session=fetch('https://lzt188jvx2.execute-api.us-east-1.amazonaws.com/v1',{
    method:'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      card:card,
      items:itemData
    })
  }).then(function(response){
    return response.json()
  })
  session.then(function(data){
    console.log('success')

    console.log(data)
  },function(err){
    console.log(err)
  })

}


function toArray(object) {
  let array = []
  for (const i in object) {
    array.push({ id: i, ...object[i] })
  }
  return array
}