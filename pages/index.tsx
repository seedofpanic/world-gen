import type { NextPage } from 'next'
import React from "react";
import { configure } from "mobx"
import WorldComponent from "../react/components/WorldComponent";
import {observer} from "mobx-react-lite";

configure({ useProxies: "ifavailable" });

const Home: NextPage = () => {
  return (
    <WorldComponent/>
  )
};

export default observer(Home)
