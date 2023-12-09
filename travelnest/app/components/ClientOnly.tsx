'use client'
import { useState ,useEffect} from "react";

// interface for the 'ClientOnly' component
interface ClientProp{
    children: React.ReactNode;  // Children components to be rendered
}


export const ClientOnly:React.FC<ClientProp> = ({
    children
}) => {
  const [hasMounted ,sethasMounted]=useState(false);

  useEffect(()=>{
    sethasMounted(true);
  },[]);

  // If the component has not mounted
  if(!hasMounted){
    return null;
  }

  return (
    <div>{children}</div>
  )
}
