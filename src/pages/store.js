import React from "react"
import { Link } from "gatsby"
import SEO from "../components/utilities/seo"

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stripe: null
    };
  }

  componentDidMount() {
    this.setState({
      stripe: window.Stripe('pk_test_InINzDHBEOsFgTTZXdZvB0og008pNICPQq', {betas: ['checkout_beta_3']}) 
    })
    let p = fetch('https://api.stripe.com/v1/products',{
      method: "GET",
      withCredentials: true,
      headers: {
        "Authorization": "Bearer pk_test_InINzDHBEOsFgTTZXdZvB0og008pNICPQq",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      }
    })
    let pp=p.then(function(r){
      return r.json()
    })
    pp.then(function(data){
      console.log(data.data)
    })
  }
  render() {
    const {
      props,
    } = this;

    return < >
      <SEO title="Page two" />
      <h1>store</h1>
      <button style={{padding:'50px'}} onClick={
        function(){
          this.state.stripe.redirectToCheckout({
            items: [
              {sku: 'sku_GQQy4UAvaqZELN', quantity: 1},
              {sku: 'sku_GQQA1fSlwR9eIO', quantity: 2}
            ],
            successUrl: window.location.protocol + '//yourtechclass.com/success',
            cancelUrl: window.location.protocol + '//yourtechclass.com/canceled',
          })
          .then(function (result) {
            if (result.error) {
              var displayError = document.getElementById('error-message');
              displayError.textContent = result.error.message;
            }
          }); 
        }.bind(this)
      }>Buy a belt buckle</button>
    </>;
  }
}