interface TitleProps{
  txt: string
}

export function Title(props:TitleProps){
  return(
    <>
      <div className="title">
        <h1 >{props.txt}</h1>
      </div>
    </>
  )
}