import { reactive } from 'vue'

export const recipeProposalStore: any = reactive({
  history: [],
  imageIngredients: [],
  imageUrl: ''
} as const)

export const clearProposalStore = () => {
  recipeProposalStore.history = []
  recipeProposalStore.imageIngredients = []
  recipeProposalStore.imageUrl = ''
}
