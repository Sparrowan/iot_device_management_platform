export type configurationType = {
  id: string
  name: string
  description: string
  content: {
    type: string
    unit: string
    values: string[] | number[]
  }
}
