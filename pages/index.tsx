import type { NextPage } from 'next'
import React from "react";
import { configure } from "mobx"
import WorldComponent from "../react/components/WorldComponent";
import {worldPage} from "../react/models/World";
import {observer} from "mobx-react-lite";

configure({ useProxies: "ifavailable" });

const Home: NextPage = () => {
  worldPage.init();

  return (
    <WorldComponent/>
  )
};

export default observer(Home)
