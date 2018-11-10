export default function inArray(value) {
  if (value && value[0] && value[1]) {
    return value[1].indexOf(value[0]) > -1;
  }
  return false;
}