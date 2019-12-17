import React from "react"
import "./style.scss"

export function Featured(props){ return <div className = {"featured"+(props.horizontal?' -horizontal':'')}>
{props.children}
</div>}
export function FeaturedItem(props){ return <div className = "featuredItem">
   
    {props.children}
  
</div>}

export function FeaturedItem__title({children}){ 
    return <div className = {"featuredItem__title"}>
        <h2 className = "heading--4 -white heading -background--primary">
{children}
</h2>
</div>}

export function FeaturedItem__content({children}){ 
    return <div className = {"featuredItem__content"} > 
{children}
</div>}

export function FeaturedItem__image(props){ 
    return <div style = {{backgroundImage:"url(" + props.img + ")"}} className ={"featuredItem__image"} /> }