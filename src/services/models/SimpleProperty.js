// This is a utility class to avoid doing a ton this this.thing = props.thing
export default class SimpleProperty {
  constructor (props) {
    Object.assign(this, props)
  }
}
