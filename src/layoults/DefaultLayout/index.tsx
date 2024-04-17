import { Outlet } from "react-router-dom";
import { Header } from "../../components/Header";
import { LayaoutContainer } from "./styles";

export function DefaultLayout(){
  return(
    <LayaoutContainer>
      <Header />
      <Outlet />
    </LayaoutContainer>
  )
}