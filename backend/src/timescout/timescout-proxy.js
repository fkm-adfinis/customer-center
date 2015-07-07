import url       from 'url'
import httpProxy from 'express-http-proxy'

export default class TimescoutProxy {

  static createProxy(service) {
    return httpProxy(service.host, new this(service))
  }

  constructor(t) {
    this.host   = t.host
    this.apiKey = t.apiKey

    this.decorateRequest = this.decorateRequest.bind(this)
  }

  decorateRequest(req) {
    req.headers['X-Timescout-API-Key'] = this.apiKey
  }
}
