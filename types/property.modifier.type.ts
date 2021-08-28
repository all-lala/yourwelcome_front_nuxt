export default interface PropertyModifierType<T> {
  property: keyof T,
  value: T[keyof T]
}