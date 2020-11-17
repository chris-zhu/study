import React from "react";
import Layout from "../../components/Layout";
import Header from "../../components/Header";
import Aside from "../../components/Aside";
import Welcome from "../Welcome";
import Students from "../Students";
import StudentsAdd from "../StudentsAdd";
import { Route } from "react-router-dom";

export default function Admin() {
  return (
    <div>
      <Layout header={<Header />} aside={<Aside />}>
        <Route path="/students" exact component={Students} />
        <Route path="/students/add" exact component={StudentsAdd} />
      </Layout>
    </div>
  );
}
