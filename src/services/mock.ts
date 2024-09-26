export type QueryMethod = 'GET' | 'POST';
export interface MockQuery <QueryParams, QueryData> {
  params: QueryParams;
  data: QueryData;
};
export interface MockResponseInterface <QueryResponse> {
  data?: QueryResponse,
  error?: string,
};
export type QueryMock <Query, QueryResponse> = (query: Query) => Promise<QueryResponse>;

function mockQueryDecorator<Query, QueryResponse> (method: QueryMethod, url: string, callback: QueryMock<Query, QueryResponse>) {
  return async(query: Query): Promise<MockResponseInterface<QueryResponse>> => {
    const uuid = crypto.randomUUID();
    console.log(method, 'REQUEST:', uuid, url, query);
    try {
      const response = await callback(query);
      console.log(method, 'SUCCESS:', uuid, url, response);
      return {
        data: response,
      };
    } catch(e) {
      console.log(method, 'ERROR:', uuid, url, e);
      return {
        error: `${e}`,
      };
    }    
  };
}

export default mockQueryDecorator;
