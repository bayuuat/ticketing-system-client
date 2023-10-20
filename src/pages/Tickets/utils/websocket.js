import { useState, useCallback, useEffect } from 'react';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client/dist/sockjs';
import Cookies from 'js-cookie';

const useWebSocketConnection = (initialTicketId) => {
  const [messages, setMessages] = useState([]);
  const [client, setClient] = useState(null);
  const [subscriber, setSubscriber] = useState(null);
  const [connected, setConnected] = useState(false);
  const [ticketId, setTicketId] = useState(initialTicketId);
  const accessToken = Cookies.get('access_token');
  const customer = Cookies.get('user_detail');
  const customerEmail = 'mohripan16@gmail.com';

  useEffect(() => {
    setTicketId(initialTicketId);
  }, [initialTicketId]);

  const connect = () => {
    setMessages([]);
    if (connected) {
      return;
    }

    let wsUrl = 'http://localhost:9000/api/replies/websocket';

    if (!customer) {
      wsUrl += `?token=${accessToken}`;
    } else {
      const customerData = JSON.parse(customer);
      wsUrl += `?email=${customerEmail}`;
    }

    const sock = new SockJS(wsUrl);
    const stompClient = new Client({
      webSocketFactory: () => sock,
    });

    stompClient.onConnect = (frame) => {
      console.log('Connected: ', frame);
      const subscriber = stompClient.subscribe(`/topic/tickets/${ticketId}`, (ticketMessage) => {
        setMessages((prevMessages) => [...prevMessages, JSON.parse(ticketMessage.body)]);
      });
      setSubscriber(subscriber)
      setConnected(true);
    };
    stompClient.onStompError = (frame) => console.error('STOMP Error:', frame);
    stompClient.onWebSocketError = (event) => console.error('WebSocket Error:', event);
    stompClient.onWebSocketClose = (event) => {
      // connect(); 
      console.warn('WebSocket Closed:', event);
      setConnected(false);
    };
    stompClient.activate();
    setClient(stompClient);
  };

  useEffect(() => {
    if (ticketId) {
      connect();
    }
    return () => {
      if (client) {
        client.deactivate();
      }
    };
  }, [ticketId]);

  const sendMessage = (message) => {
    if (connected) {
      client.publish({ destination: `/app/user/${ticketId}/sendMessage`, body: JSON.stringify(message) });
    }
  };

  return {
    messages,
    connected,
    sendMessage,
  };
};

export default useWebSocketConnection;
