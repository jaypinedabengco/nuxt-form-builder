export default {
  deepClone(objectToClone) {
    return JSON.parse(JSON.stringify(objectToClone))
  }
}
