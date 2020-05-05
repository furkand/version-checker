interface Request {
  path?: string,
  method?: string,
  params?: Object,
  query?: Object,
  body?: Object
}

export default function adaptRequest(req: Request = {}): Request {
  return Object.freeze({
    path: req.path,
    method: req.method,
    pathParams: req.params,
    queryParams: req.query,
    body: req.body
  })
}