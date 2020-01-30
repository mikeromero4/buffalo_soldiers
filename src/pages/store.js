import React from "react"
import { Link } from "gatsby"
import SEO from "../components/utilities/seo"
import { ButtonGroup, Button,Select,MenuItem, InputLabel,RootRef} from "@material-ui/core"
import { Main, Section } from "../components/templates/generic/common"
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart"

import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart"

import CheckOut from "../components/organisms/store/checkout" 

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
      toArray(items).map((e,i) => (
        <Item key= {'it'+i} addToCart={addToCart} data={e} />
      ))
    )}
  </div>
  </div>
)
let Item = ({ addToCart, data: { id, name, images, price,variations } }) => {
  let refs=[]
  for(let i=0;i<variations.length;i++){refs.push(React.createRef())}
let sref=React.createRef()
  return(
  <div className="storeItem">
    <div
      className="storeItem__image"
      style={{ backgroundImage: `url(${images[0]})` }}
    />
    <div className="storeItem__description">
      <span className="storeItem__name">{name}</span><br/>
      <span className="storeItem__price">{price?"$" + (price / 100).toFixed(2):''}</span>
      <InputLabel id="size">Size:</InputLabel>
      <RootRef rootRef={sref}>
      <select variant='outlined'  id='size'>
        {variations.map((e,i)=><option key={'op'+i}  value={i}>{e.size+': $' + (e.price / 100).toFixed(2)}</option>)}
      
      </select>
      </RootRef>
    </div>
    <Button
      color="secondary"
      variant="outlined"
      fullWidth
      onClick={function() {
        console.log(sref.current)
        addToCart(id,variations[sref.current.value])
      }}
    >
      <AddShoppingCartIcon />
      Add to cart
    </Button>
  </div>
)}

export default class extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      storeReady: false,
      cart: {},
      inventory: [],
      stripe: null,
      status:"shop"
    }
    this.addToCart = this.addToCart.bind(this)

    this.setStatus = this.setStatus.bind(this)
  }
  addToCart(item,variation) {
    console.log(variation)
    let itemId=item+"&"+variation.sku
    let {cart}= this.state
    if (cart[itemId] == undefined ) {
      cart[itemId] = {
        item: this.state.inventory[item],
        variation:variation,
        quantity: 1,
      }
    } else {
      cart[itemId].quantity++
    }
    this.setState({
      cart:cart
    })
  }
  componentDidMount() {
    console.log(process.env.stripe || "nos")
    this.setState({
      stripe: window.Stripe(key2, { maxNetworkRetries: 3 }),
    })
    getInventory(this)
  }
  setStatus(status){
this.setState({status:status})
  }
  render() {
    const { props } = this

    return (
      <>
        <SEO title="Page two" />
        <Main reverseSidebar sidebar={<Cart setStatus = {this.setStatus} stripe={this.state.stripe} items={this.state.cart} />}>
{this.state.status=="checkOut"?
<CheckOut stripe = {this.state.stripe} cart = {this.state.cart}/>
:
<Catalog
addToCart={this.addToCart}
loaded={this.state.storeReady}
items={this.state.inventory}
/>
}

        </Main>
      </>
    )
  }
}

function Cart({ items,stripe,setStatus }) {
  let cart = toArray(items)
  let totalPrice = 0
  let totalItems = 0
  cart.forEach((e)=>{
    totalPrice+=e.variation.price*e.quantity
    totalItems+=e.quantity
  })
  console.log(cart)
  return (
    <div className='shoppingCart'>
      <h3>In
        Cart <ShoppingCartIcon />{totalItems}
      </h3>
      {cart.length==0?'Your cart is empty.':''}<br/>
      {cart.map((e,i) => (
        <div key ={'sh'+i} className = "shoppingCart__item">
              <div
      className="shoppingCart__image"
      style={{ backgroundImage: `url(${e.item.images[0]})` }}
    />
          <div className="shoppingCart__info">{e.item.name} <br/>
          {'('+e.variation.size}) </div>

    <div>
          <div className="shoppingCart__price">${ (e.variation.price / 100).toFixed(2)} </div>
          <input type='number' onChange={function(){}} min="0" max="999" style = {{width:"50px"}} value={e.quantity}></input>
        </div>
        </div>
      ))}
     <br/> Total price:${ (totalPrice / 100).toFixed(2)}
      <Button variant = "contained" fullWidth color = "secondary" onClick = {function(){
        setStatus("checkOut")
        //checkOut(stripe,cart)
      }}>
        CheckOut
        </Button>
    </div>
  )
}
//https://lzt188jvx2.execute-api.us-east-1.amazonaws.com/v1
// function checkOut(stripe, items) {
//   console.log(items)
//   let itemData = items.map((e)=>({
//     sku:e.variation.sku,
//     quantity:e.quantity,
//     size:e.variation.size
//   }))
// console.log(itemData)
//   let session=fetch('https://lzt188jvx2.execute-api.us-east-1.amazonaws.com/v1',{
//     method:'POST',
//     headers: {
//       'Accept': 'application/json',
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify({items:itemData})
//   }).then(function(response){
//     return response.json()
//   })
//   session.then(function(data){
//     console.log('success')

//     console.log(data)
//   },function(err){
//     console.log(err)
//   })
//   // session.then(redirectToCheckOut,function(err){
//     //   console.log(err)
//     // })
//   function redirectToCheckOut(data) {
    
//       console.log(data)
//       stripe.redirectToCheckout({
//         sessionId: data.body
//         })
//         .then(function(result) {
//           if (result.error) {
//             var displayError = document.getElementById("error-message")
//             displayError.textContent = result.error.message
//           }
//         })
    
//   }
// }
function fetchJson(url){
  let promise = fetch(url, {
    method: "get",
    withCredentials: true,
    headers: {
      Authorization: "Bearer " + key,
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  })
  let data = promise.then(function(response) {
    return response.json()
  })
  return data
}

async function getInventory(cc){
  let inventoryData=fetchJson("https://api.stripe.com/v1/products")
  inventoryData.then(async function(data) {
    let newData = {}
    data.data.forEach(({name,active, images, id }) => {
     if(active) {newData[id] = { images, name,variations:[]}}
    })
    cc.setState({
      inventory: newData,
      storeReady: true,
    })
    let skus= await getSkus(data)
    console.log(skus)
    skus.forEach((e)=>{
      e.data.forEach((sku)=>{
        if(newData[sku.product]==undefined){return}
        let d=newData[sku.product]
        //d.price=sku.price
        d.variations.push({
          size:sku.attributes.size,
          price:sku.price,
          sku:sku.id
        })
      })
    })
    cc.setState({
      inventory: newData
    })
  })
}

function getSkus(data){
  let promises=[]
  data.data.forEach((e)=>{
    promises.push(fetchJson("https://api.stripe.com/v1/skus?product="+e.id))
    })
    return Promise.all([...promises])
}