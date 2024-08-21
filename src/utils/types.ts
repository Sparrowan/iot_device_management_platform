export type configurationType = {
  id: string
  name: string
  description: string
  content: any
  createdAt: string
  updatedAt?: string
}
export type configurationState = {
  configurations: configurationType[]
  loading: boolean
  error: string | null
  configuration: configurationType | null
  searchTerm: string
}
