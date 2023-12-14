export interface MockQuery <QueryParams, QueryData> {
  params: QueryParams;
  data: QueryData;
};
export interface MockResponseInterface <QueryResponse> {
  data?: QueryResponse,
  error?: string,
};
export type QueryMock <Query, QueryResponse> = (query: Query) => Promise<QueryResponse>;

function mockQueryDecorator<Query, QueryResponse> (url: string, callback: QueryMock<Query, QueryResponse>) {
  return async(query: Query): Promise<MockResponseInterface<QueryResponse>> => {
    const uuid = crypto.randomUUID();
    console.log('REQUEST:', uuid, url, query);
    try {
      const response = await callback(query);
      console.log('SUCCESS:', uuid, url, response);
      return {
        data: response,
      };
    } catch(e) {
      console.log('ERROR:', uuid, url, e);
      return {
        error: `${e}`,
      };
    }    
  };
}

export default mockQueryDecorator;
