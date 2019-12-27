import React from "react"
import { Link } from "gatsby"
import SEO from "../components/utilities/seo"
// let key='sk_test_IWWa4eKPnLz174AKtXBoPUFQ00p5xIVNIO'
// let key2='pk_test_InINzDHBEOsFgTTZXdZvB0og008pNICPQq'
 let key='sk_live_BnKM3aWMlT4rJD1hDMMrmRTl00xO6OMax8'
let key2='pk_live_IBJ2KJKhKasoN7D2iRp6YbxI0063zOaMbF'

let Catalog = ({items,loaded,stripe})=><>
{loaded==false?<span>loading catalog...</span>:items.map(e=><div>
  <Item stripe = {stripe} data = {e}/>
</div>)
   }
</>
let Item = ({stripe,data:{id,name,image,price}})=><div>
  <h3>{name}</h3>
  <h2>{price}</h2>
  <img className = "storeItem" src = {image}/>
        <button onClick = {function(){stripe.redirectToCheckout({
            items: [
              {sku: id, quantity: 1}
            ],
            successUrl: window.location.protocol + '//yourtechclass.com/success',
            cancelUrl: window.location.protocol + '//yourtechclass.com/canceled',
          })
          .then(function (result) {
            if (result.error) {
              var displayError = document.getElementById('error-message');
              displayError.textContent = result.error.message;
            }
          })}}> 
          Buy this
          </button>
</div>

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      storeReady:false,
      inventory:[],
      stripe: null
    };
  }

  componentDidMount() {
    console.log(process.env.stripe || "nos")
    this.setState({
       stripe: window.Stripe(key2, {betas: ['checkout_beta_3']}) 
     })
    let cc = this
    let p = fetch('https://api.stripe.com/v1/skus',{
      method: "GET",
      withCredentials: true,
      headers: {
        "Authorization": "Bearer "+key,
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      }
    })
    let pp=p.then(function(r){
      return r.json()
    })
    pp.then(function(data){
      console.log(data)
      let newData = data.data.map(({price,image,attributes,id})=>({
        id,price,image,name:attributes.name
      }))
    
          cc.setState({
      inventory: newData,
      storeReady:true
    })
    })
  }
  render() {
    const {
      props,
    } = this;

    return < >
      <SEO title="Page two" />
      <h1>store</h1>
    <Catalog stripe = {this.state.stripe} loaded = {this.state.storeReady} items = {this.state.inventory}/>
    </>;
  }
}
