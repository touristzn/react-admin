import React from 'react';
import ReactDOM from 'react-dom';
import Message from '@/components/message'

export default function message(options) {
  const body = document.body;
  const node = document.createElement("div");
  node.setAttribute('class', 'message-content');
  body.appendChild(node);

  const onClose = () => {
    ReactDOM.unmountComponentAtNode(node);
    body.removeChild(node);
  }

  ReactDOM.render(
    <Message options={options} close={onClose} />,
    node
  )
}