import React from "react";
import { Link } from "react-router-dom";
import "./index.css";
export default function Aside() {
  return (
    <ul>
      {/* <li>学生管理</li> */}
      <li className="active">
        <Link to="/students">学生列表</Link>
      </li>
      <li>
        <Link to="/students/add">添加学生</Link>
      </li>
    </ul>
  );
}
