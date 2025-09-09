'use client';

import { Client, IMessage } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { useEffect } from 'react';

type ApplyStatusMessage = {
  activityPostId: number;
  userId: number;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
};

type Callback = (
  activityId: number,
  newStatus: ApplyStatusMessage['status']
) => void;

export function useApplyStatus(
  activityPostIds: string[],
  onStatusChange: Callback
) {
  useEffect(() => {
    const storedUserId = localStorage.getItem('id');
    console.log(storedUserId);
    if (!storedUserId || activityPostIds.length === 0) return;

    const userId = Number(storedUserId);

    const socket = new SockJS(`${process.env.NEXT_PUBLIC_API_URL}/broadcast`);
    const client = new Client({
      webSocketFactory: () => socket,
      reconnectDelay: 5000,
      onConnect: () => {
        activityPostIds.forEach((id) => {
          client.subscribe(
            `/topic/applicant-status/${id}/${userId}`,
            (message: IMessage) => {
              const data: ApplyStatusMessage = JSON.parse(message.body);
              console.log(data.activityPostId, data.status);
              onStatusChange(data.activityPostId, data.status);
            }
          );
        });
      },
    });

    client.activate();

    return () => {
      client.deactivate();
    };
  }, [activityPostIds.join(','), onStatusChange]);
}
