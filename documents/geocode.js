let url = "https://maps.googleapis.com/maps/api/geocode/json?"
let key = "AIzaSyBi8HYhLfAHJ1SebXf7Bz2Q05h0L8ho-Vg"
let address="1600+Amphitheatre+Parkway,+Mountain+View,+CA"

let url2=`${url}
address=${key}
&key=${key}`
console.log(url2)
let y=async function(){
    
let d=fetch(url2)
let p=await d
let v=(await p).json()
console.log(v)
}
y()