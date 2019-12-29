import React from "react"
import { Link } from "gatsby"
import SEO from "../components/utilities/seo"
import { ButtonGroup, Button } from "@material-ui/core"
import { Main, Section } from "../components/templates/generic/common"
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart"

import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart"

function toArray(object) {
  let array = []
  for (const i in object) {
    array.push({ id: i, ...object[i] })
  }
  return array
}
// let key='sk_test_IWWa4eKPnLz174AKtXBoPUFQ00p5xIVNIO'
// let key2='pk_test_InINzDHBEOsFgTTZXdZvB0og008pNICPQq'
let key = "sk_live_BnKM3aWMlT4rJD1hDMMrmRTl00xO6OMax8"
let key2 = "pk_live_IBJ2KJKhKasoN7D2iRp6YbxI0063zOaMbF"

let Catalog = ({ items, loaded, addToCart }) => (
    <div className="storeCatalogContainer">
      <h1>Buffalo Soldiers' store</h1>
  <div className="storeCatalog">
    {loaded == false ? (
      <span>loading catalog...</span>
    ) : (
      toArray(items).map(e => (
        <Item addToCart={addToCart} data={e} />
      ))
    )}
  </div></div>
)
let Item = ({ addToCart, data: { id, name, image, price } }) => (
  <div className="storeItem">
    <div
      className="storeItem__image"
      style={{ backgroundImage: `url(${image})` }}
    />
    <div className="storeItem__description">
      <span className="storeItem__name">{name}</span><br/>
      <span className="storeItem__price">{"$" + (price / 100).toFixed(2)}</span>
    </div>
    <Button
      color="secondary"
      variant="outlined"
      fullWidth
      onClick={function() {
        addToCart(id)
      }}
    >
      <AddShoppingCartIcon />
      Add to cart
    </Button>
  </div>
)

export default class extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      storeReady: false,
      cart: {},
      inventory: [],
      stripe: null,
    }
    this.addToCart = this.addToCart.bind(this)
  }
  addToCart(item) {
    let {cart}= this.state
   
    if (cart[item] == undefined) {
      cart[item] = {
        item: this.state.inventory[item],
        quantity: 1,
      }
    } else {
      cart[item].quantity++
    }
    this.setState({
      cart:cart
    })
  }
  componentDidMount() {
    console.log(process.env.stripe || "nos")
    this.setState({
      stripe: window.Stripe(key2, { betas: ["checkout_beta_3"] }),
    })
    let cc = this
    let p = fetch("https://api.stripe.com/v1/skus", {
      method: "GET",
      withCredentials: true,
      headers: {
        Authorization: "Bearer " + key,
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    })
    let pp = p.then(function(r) {
      return r.json()
    })
    pp.then(function(data) {
      console.log(data)
      let newData = {}
      data.data.forEach(({ price, image, attributes, id }) => {
        newData[id] = { price, image, name: attributes.name }
      })
      cc.setState({
        inventory: newData,
        storeReady: true,
      })
    })
  }
  render() {
    const { props } = this

    return (
      <>
        <SEO title="Page two" />
        <Main reverseSidebar sidebar={<Cart stripe={this.state.stripe} items={this.state.cart} />}>
          
          <Catalog
            addToCart={this.addToCart}
            loaded={this.state.storeReady}
            items={this.state.inventory}
          />
        </Main>
      </>
    )
  }
}

function Cart({ items,stripe }) {
  let cart = toArray(items)
  let totalPrice = 0
  let totalItems = 0
  cart.forEach((e)=>{
    totalPrice+=e.item.price*e.quantity
    totalItems+=e.quantity
  })
  console.log(cart)
  return (
    <div className='shoppingCart'>
      <h3>
        Cart <ShoppingCartIcon />{totalItems}
      </h3>
      {cart.length==0?'Your cart is empty.':''}<br/>
      {cart.map(e => (
        <div className = "shoppingCart__item">
              <div
      className="shoppingCart__image"
      style={{ backgroundImage: `url(${e.item.image})` }}
    />
          <div className="shoppingCart__info">{e.item.name} </div>
          <input type='number' min="0" max="999" style = {{width:"50px"}} value={e.quantity}></input>
        </div>
      ))}
     <br/> Total price:${ (totalPrice / 100).toFixed(2)}
      <Button variant = "contained" fullWidth color = "secondary" onClick = {function(){
        checkOut(stripe,cart)
      }}>
        CheckOut
        </Button>
    </div>
  )
}
function checkOut(stripe, items) {
  let itemData = items.map((e)=>({
    sku:e.id,
    quantity:e.quantity
  }))
  //cs_live_zGDcFqd6IMae0sASCH3iI7biiBtuw55904qZDdODeUZbLUviLo8VGv9w
  stripe.redirectToCheckout({
    billing_address_collection: 'required',

    sessionId: 'cs_live_zGDcFqd6IMae0sASCH3iI7biiBtuw55904qZDdODeUZbLUviLo8VGv9w'
    })
    .then(function(result) {
      if (result.error) {
        var displayError = document.getElementById("error-message")
        displayError.textContent = result.error.message
      }
    })
}
