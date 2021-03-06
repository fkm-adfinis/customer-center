import Controller from '@ember/controller'
import { computed } from '@ember/object'
import { alias } from '@ember/object/computed'
import { inject as service } from '@ember/service'

import { task } from 'ember-concurrency'
import moment from 'moment'
import { hash } from 'rsvp'
import UIkit from 'UIkit'

export default Controller.extend({
  i18n: service(),
  notify: service(),
  session: service(),

  loading: alias('fetchModels.isRunning'),
  project: alias('fetchModels.lastSuccessful.value.project'),
  orders: alias('fetchModels.lastSuccessful.value.orders'),

  duration: computed('validation.{hour,minute}', 'hour', 'minute', function() {
    if (this.get('validation.hour') || this.get('validation.minute')) {
      return moment.duration({
        hours: (this.get('validation.hour') && this.hour) || 0,
        minutes: (this.get('validation.minute') && this.minute) || 0
      })
    }
  }),

  error: computed('validation.{hour,minute}', 'hour', 'minute', function() {
    return (
      (this.hour && !this.get('validation.hour')) ||
      (this.minute && !this.get('validation.minute'))
    )
  }),

  previewDuration: computed('duration', 'preview', function() {
    return (
      this.duration &&
      this.preview &&
      moment.duration(
        this.get('project.purchasedTime') +
          this.duration -
          this.get('project.spentTime')
      )
    )
  }),

  validation: computed('hour', 'minute', function() {
    let validation = {
      hour: Boolean(Number(this.hour)),
      minute: Boolean(Number(this.minute))
    }

    if (validation.hour || validation.minute) {
      this.set('preview', true)
    }

    return validation
  }),

  fetchModels: task(function*() {
    try {
      yield this.fetchReports.perform()
      return yield hash({
        orders: this.store.query('timed-subscription-order', {
          project: this.get('model'),
          ordering: '-ordered'
        }),
        project: this.store.findRecord(
          'timed-subscription-project',
          this.get('model'),
          {
            include: 'billing_type,customer'
          }
        )
      })
    } catch (e) {
      this.notify.error(this.i18n.t('timed.detail.errorLoading'))
    }
  }).drop(),

  fetchReports: task(function*() {
    try {
      const reports = yield this.store.query('timed-report', {
        project: this.get('model'),
        include: 'user',
        ordering: '-date',
        page: this.get('reportsPage'),
        page_size: 20
      })

      reports.forEach(report => this.reports.pushObject(report))
      this.set('reportsPage', this.get('reportsPage') + 1)
      this.set('reportsNext', Boolean(reports.get('links.next')))

      return reports
    } catch (e) {
      this.notify.error(this.i18n.t('timed.detail.errorLoading'))
    }
  }).enqueue(),

  save: task(function*() {
    try {
      let order = this.store.createRecord('timed-subscription-order', {
        duration: this.duration,
        acknowledged: false,
        project: this.get('project'),
        ordered: moment(this.get('ordered'))
      })
      yield order.save()

      this.notify.success(this.i18n.t('timed.reload.success'))
      UIkit.accordion('[data-reload-acc]').toggle()
      this.setProperties({ hour: null, minute: null })
    } catch (e) {
      this.notify.error(this.i18n.t('timed.reload.error'))
    } finally {
      this.fetchModels.perform()
      this.set('preview', false)
    }
  }).drop(),

  actions: {
    saveOrder() {
      // Reset page
      this.set('reportsPage', 1)
      this.save.perform()
    }
  }
})
