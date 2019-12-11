import React from "react"
import "./style.scss"

export function Featured(props){ return <div className = "featured">
{props.children}
</div>}
export function FeaturedItem(props){ return <div className = "featured__item">
    {props.children}
</div>}
