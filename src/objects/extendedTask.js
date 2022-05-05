export function ExtendedTask (name, value) {
    this.name = name
    this.value = value

    return { name: this.name, value: this.value}
}
