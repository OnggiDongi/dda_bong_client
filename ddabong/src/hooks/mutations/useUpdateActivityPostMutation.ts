import type { components, operations } from '@/types/openapi';
import { useMutation } from '@tanstack/react-query';
import { privateClient } from '@/lib/openapi-client';

type BackendError = {
  status: string;
  errorCode: number;
  errorMessage: string;
};

type ActivityPostRequest = Omit<
  components['schemas']['ActivityPostRequestDTO'],
  'image'
> & {
  image?: File;
};

const updateActivityPost = async ({
  id,
  body,
}: {
  id: number;
  body: ActivityPostRequest & { image?: File };
}) => {
  const formData = new FormData();
  Object.entries(body).forEach(([key, value]) => {
    if (key === 'image' && value instanceof File) {
      formData.append(key, value);
    } else if (value !== undefined && value !== null) {
      formData.append(key, String(value));
    }
  });

  const { data, error } = await privateClient.PATCH('/posts/{id}', {
    params: {
      path: {
        id,
      },
    },
    body: formData as unknown as NonNullable<
      operations['updateActivityPost']['requestBody']
    >['content']['multipart/form-data'],
  });

  if (error) {
    throw new Error(JSON.stringify(error));
  }

  if (data && typeof data === 'object' && 'errorMessage' in data) {
    const backendError = data as unknown as BackendError;
    if (backendError.errorMessage) {
      throw new Error(backendError.errorMessage);
    }
  }

  return data;
};

export const useUpdateActivityPostMutation = () => {
  return useMutation({
    mutationFn: updateActivityPost,
  });
};
