import React from "react"

export function Section({sidebar,name,children,classes}) {
    if (sidebar){
  return <div id = {name} className = {"t-section -withSidebar"
  +(classes?' '+classes.reduce((p,c)=>p+c):'')}>
  <div className="t-section__sidebar">
  {sidebar}
  </div>
  <div className="t-section__content">
    {children}
  </div>
  </div>
    }
  else return <div id = {name} className = {"t-section"+(classes?' '+classes.reduce((p,c)=>p+c):'')}>{children}</div>
  }
  export function Main({children,sidebar,margin,reverseSidebar}) {
    return <main className={"t-main" + (margin?" -withMargin":"") + (sidebar?" -withSidebar"+(reverseSidebar?' reverse':''):"")}>
      {sidebar?<div className = {"t-main__sidebar"}>{sidebar}</div>:""}
      <div className = "t-main__content  -inverseColors">{children}</div>
    </main>
    }