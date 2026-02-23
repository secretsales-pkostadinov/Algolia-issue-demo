import { createMemoryCache } from '@algolia/client-common';
import { liteClient as algoliasearch } from 'algoliasearch/lite';

export const responsesCache = createMemoryCache();



export const createAlgoliaSearchClient = (appId: string, apiKey: string) => {
  const client = algoliasearch(appId, apiKey, {
    responsesCache: responsesCache,
  });

  // Keep original request function
  const originalRequest = client.transporter.request.bind(client.transporter);

  client.transporter.request = async (
    request: any,
    requestOptions?: any
  ): Promise<any> => {
    const start = performance.now();

    return originalRequest(request, requestOptions).finally(
      () => {
        console.log(`[Algolia] Request: ${JSON.stringify(request)}`);
        const duration = performance.now() - start;
        console.log('[Algolia]', {
          request: request,
          method: request.method,
          path: request.path,
          duration: `${duration.toFixed(2)}ms`,
          cacheable: request.cacheable,
        });
      }
    );
  };

  return client;
};


export const client = createAlgoliaSearchClient(
  'latency',
  '6be0576ff61c053d5f9a3225e2a90f76'
);