import {apiFactory, RequestParameter, ResponseParameter} from '@japan-d2/api'
import axios, {AxiosInstance} from 'axios'
import {APICallable} from '@japan-d2/api/lib'
import {defaultKeyNameMap, endpointSchemaFactory} from '@japan-d2/schema-api-endpoint/lib'

const schema = {
  'status': {
    ...endpointSchemaFactory({keyNameMap: defaultKeyNameMap})({}),
    url: '/status',
    method: 'get',
    endpoint: 'GET /status',
  }
} as const

export function axiosApiConnectorFactory(
  axiosInstance: AxiosInstance,
): (input: RequestParameter) => Promise<ResponseParameter> {
  return async (input: RequestParameter): Promise<ResponseParameter> => {
    const response = await axiosInstance(input.url, {
      method: input.method,
      headers: input.headers,
      params: input.query,
      responseType: 'json',
      ...(input.body ? {
        data: input.body,
      } : {}),
    })

    return {
      statusCode: response.status,
      body: response.data,
      headers: response.headers,
    }
  }
}

const api1: APICallable<{}, typeof schema> = apiFactory<{}, typeof schema>(
  {},
  schema,
  axiosApiConnectorFactory(
    axios.create({}),
  ),
)

api1('status').request({}) // successfully typed, and warn `promise is ignored` is correctly shown.

// apiFactory<O, E>(o: O, e: E, c): APICallable<O, E>
// api2 should be inferred as APICallable<O, E>, but isn't.
const api2 = apiFactory<{}, typeof schema>(
  {},
  schema,
  axiosApiConnectorFactory(
    axios.create(),
  ),
)

api2('status').request({}) // type checked, but not suggested and `promise is ignored` warning is not shown.
