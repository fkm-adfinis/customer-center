import Component from '@ember/component'
import EmberObject from '@ember/object'

function external(internalModel) {
  return internalModel.reduce((prev, curr) => {
    prev[curr.key] = curr.value
    if (curr.comment) {
      prev[`${curr.key}_comment`] = curr.comment
    }
    return prev
  }, {})
}

function internal(model) {
  return !model
    ? null
    : Object.keys(model)
        .map(key => {
          return EmberObject.create({
            key,
            value: model[key],
            edit: false
          })
        })
        .reduce((prev, curr) => {
          if (curr.key.endsWith('_comment')) {
            prev[prev.length - 1].comment = curr.value
            return prev
          }
          return [...prev, curr]
        }, [])
}

export default Component.extend({
  didReceiveAttrs() {
    this._super(...arguments)
    this.set('_model', internal(this.model))
  },

  actions: {
    async save(index, { key = 'value', value, comment = '' }) {
      this._model.replace(index, 1, [
        EmberObject.create({ key, value, comment, edit: false })
      ])
      await this.onUpdate(external(this._model))
    },

    async delete(index) {
      this._model.removeAt(index)
      await this.onUpdate(external(this._model))
    }
  }
})
