export type configurationType = {
  id: string
  name: string
  description: string
  content: {
    type: string
    unit: string
    values: string[] | number[]
  }
  createdAt: string
  updatedAt?: string
}
export type configurationState = {
  configurations: configurationType[]
  loading: boolean
  error: string | null
  configuration: configurationType | null
}
