export const conditionProps = {
  modelValue: {
    type: Boolean,
    default: false
  },

  title: {
    type: String,
    default: ''
  },

  name: {
    type: String,
    default: new Date().getTime()
  },

  disabledClick: {
    type: Boolean,
    default: true
  }
};
