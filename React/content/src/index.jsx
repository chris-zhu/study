import React from 'react';
import ReactDOM from 'react-dom';

import Form from "./Form";

ReactDOM.render(<Form onSubmit={data => {
  console.log(data)
}}>
  <div>
    <span>账号</span>
    <Form.Input name="loginId"></Form.Input>
  </div>
  <div>
    <span>密码</span>
    <Form.Input name="pwd" type="password"></Form.Input>
  </div>
  <div>
    <Form.Button>提交</Form.Button>
  </div>

</Form>, document.getElementById('root'));