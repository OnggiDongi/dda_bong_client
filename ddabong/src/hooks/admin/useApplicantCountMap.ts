'use client';

import { Client, IMessage } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { useEffect, useState } from 'react';

type ApplicantCountMessage = {
  activityId: number;
  applicantCount: number;
};

export function useApplicantCountMap(activityIds: number[]) {
  const [countMap, setCountMap] = useState<Record<number, number>>({});

  useEffect(() => {
    if (activityIds.length === 0) return;

    const socket = new SockJS(`${process.env.NEXT_PUBLIC_API_URL}/broadcast`);
    const stompClient = new Client({
      webSocketFactory: () => socket,
      reconnectDelay: 5000,
      onConnect: () => {
        activityIds.forEach((id) => {
          stompClient.subscribe(
            `/topic/applicant-count/${id}`,
            (message: IMessage) => {
              const data: ApplicantCountMessage = JSON.parse(message.body);
              setCountMap((prev) => ({
                ...prev,
                [data.activityId]: data.applicantCount,
              }));
            }
          );
        });
      },
    });

    stompClient.activate();

    return () => {
      stompClient.deactivate();
    };
  }, [activityIds]);

  return countMap;
}
