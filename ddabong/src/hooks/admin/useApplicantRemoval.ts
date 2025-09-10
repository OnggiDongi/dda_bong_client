'use client';

import { Client, IMessage } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { useEffect } from 'react';

type RemovalMessage = {
  activityPostId: number;
  userId: number;
};

type Callback = (removedUserId: number) => void;

export function useApplicantRemoval(
  activityPostId: number,
  onRemove: Callback
) {
  useEffect(() => {
    const socket = new SockJS(`${process.env.NEXT_PUBLIC_API_URL}/broadcast`);
    const client = new Client({
      webSocketFactory: () => socket,
      reconnectDelay: 5000,
      onConnect: () => {
        client.subscribe(
          `/topic/applicant-remove/${activityPostId}`,
          (message: IMessage) => {
            const data: RemovalMessage = JSON.parse(message.body);

            if (data.activityPostId === activityPostId) {
              onRemove(data.userId);
            }
          }
        );
      },
    });

    client.activate();

    return () => {
      client.deactivate();
    };
  }, [activityPostId, onRemove]);
}
