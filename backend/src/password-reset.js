import crypto     from 'crypto'
import { Router } from 'express'
import redis      from 'redis'
import ldap       from 'ldapjs'
import nodemailer from 'nodemailer'
import transport  from 'nodemailer-smtp-transport'
import app        from './app'
import PWGen      from './pwgen'
import User       from './user/model'
import config     from '../config.json'

const router = new Router
export default router

const client = redis.createClient(
  config.redis.port,
  config.redis.host,
  config.redis.options
)

const mailer = nodemailer.createTransport(transport(config.smtp))

// TODO: Should we report errors on this route?
router.post('/send-new-password', async(req, res, next) => {
  try {
    let ident = req.body.identification
    let token = await createToken(token)
    let user  = await new User({ username: ident }).fetch(/*{ required: true }*/)

    if (user && user.get('email')) {
      await setToken(ident, token)

      mailer.sendMail({
        'from':    `noreply@${config.application.host}`,
        'to':      user.get('email'),
        'subject': `Reset password on ${config.application.name}`,
        'text':    `https://${config.application.host}/login/new-password/${token}`
      }, err => {
        if (err) {
          app.log.error(err)
        }
      })
    }

    res.send({ data: {
      message: 'Great success!',
      href: 'https://www.youtube.com/watch?v=J88-RdWnNT0'
    } })
  }
  catch (e) {
    next(e)
  }
})

router.get('/reset-password/:token', async(req, res, next) => {
  try {
    if (!req.params.token) {
      return next({ status: 404, message: 'Not found' })
    }

    let ident = await getIdent(req.params.token)

    if (!ident) {
      return next({ status: 404, message: 'Not found' })
    }

    client.del(`pw-reset-token-${req.params.token}`)

    let password = createPassword(12)

    await setPassword(ident, password)

    res.send({ data: { password } })
  }
  catch (e) {
    next(e)
  }
})

function createPassword(len) {
  let gen = new PWGen
  gen.maxLength = len
  return gen.generate()
}

function createToken() {
  return new Promise((resolve, reject) =>
    crypto.randomBytes(16, (err, buffer) => {
      if (err) return reject(err)
      resolve(buffer.toString('hex'))
    })
  )
}

function setToken(ident, token) {
  return new Promise((resolve, reject) => {
    client.set(`pw-reset-token-${token}`, ident, err =>
      err ? reject(err) : resolve()
    )
    client.expire(`pw-reset-token-${token}`, config.passwordReset.expire)
  })
}

function getIdent(token) {
  return new Promise((resolve, reject) =>
    client.get(`pw-reset-token-${token}`, (err, ident) =>
      err ? reject(err) : resolve(ident)
    )
  )
}

function ldapBind(ldapClient, dn, password) {
  return new Promise((resolve, reject) =>
    ldapClient.bind(dn, password, err =>
      err ? reject(err) : resolve()
    )
  )
}

function ldapFindOne(ldapClient, searchBase, options) {
  return new Promise((resolve, reject) =>
    ldapClient.search(searchBase, options, (err, res) => {
      if (err) return reject(err)

      let searchEntry

      res.once('searchEntry', entry => searchEntry = entry)
      res.once('error',       reject)
      res.once('end',         result => resolve(searchEntry))
    })
  )
}

function ldapModify(ldapClient, dn, changes) {
  return new Promise((resolve, reject) =>
    ldapClient.modify(dn, changes, err =>
      err ? reject(err) : resolve()
    )
  )
}

async function setPassword(uid, password) {
  let { url, bindDn, bindCredentials }            = config.ldap
  let { passwordField, searchBase, searchFilter } = config.login.ldap
  let ldapClient = ldap.createClient({ url })

  await ldapBind(ldapClient, bindDn, bindCredentials)

  try {
    let { dn, attributes } = await ldapFindOne(ldapClient, searchBase, {
      filter:     searchFilter.replace('{{username}}', uid),
      attributes: [ 'dn', passwordField ],
      scope:      'sub'
    })

    let { vals: [ oldPassword ] } = attributes.find(a => a.type === passwordField)

    await ldapModify(ldapClient, dn, [
      new ldap.Change({
        operation: 'delete',
        modification: {
          [passwordField]: oldPassword
        }
      }),
      new ldap.Change({
        operation: 'add',
        modification: {
          [passwordField]: password
        }
      })
    ])
  }
  finally {
    ldapClient.unbind()
  }
}
