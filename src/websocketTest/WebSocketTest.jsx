import React, { useState } from 'react';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import Cookies from 'js-cookie';

function WebSocketTest() {
  const [messages, setMessages] = useState([]);
  const [client, setClient] = useState(null);
  const accessToken = Cookies.get('access_token');

  const connect = () => {
    const sock = new SockJS(`http://localhost:8080/api/tickets/manager/filterTickets?token=${accessToken}`);


    const stompClient = new Client({
      webSocketFactory: () => sock,
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
    });

    stompClient.onConnect = (frame) => {
      console.log('Connected: ', frame);
      stompClient.subscribe('/topic/tickets', (ticketMessage) => {
        setMessages((prevMessages) => [...prevMessages, JSON.parse(ticketMessage.body)]);
      });
    };

    stompClient.activate();
    setClient(stompClient);
  };

  const sendFilter = () => {
    if (client) {
      const filter = {
        startDate: "2011-09-01T00:00:00",
        endDate: "2023-09-30T00:00:00"
      };
      client.publish({ destination: "/app/manager/filterTickets", body: JSON.stringify(filter) });
    }
  };

  return (
    <div>
      <button onClick={connect}>Connect </button>
      <button onClick={sendFilter}>Send Filter</button>
      <pre>{messages.map((message, index) => <code key={index}>{JSON.stringify(message, null, 2)}</code>)}</pre>
    </div>
  );
}

export default WebSocketTest;