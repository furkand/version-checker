import express from 'express';
import bodyParser from 'body-parser';
import adaptRequest from './helpers/adaptRequest';
import subscriptionsEndPointHandler from './subscriptions'

// Express is basically allow us to send and receieve requests. One day we can change it that's why
// these dependencies are should be away from my bussines logic as much as possible
const app = express();

app.get('/check-version', subscriptionsController)

function subscriptionsController(req, res){
  const httpRequest = adaptRequest(req)
  subscriptionsEndPointHandler(httpRequest)
  .then(({headers, statusCode, data}) => {
    res
      .set(headers)
      .status(statusCode)
      .send(data)
  })
  .catch(e => res.status(500).end())
}

app.listen(9090, () => console.log(`Listening on port 9090`))
