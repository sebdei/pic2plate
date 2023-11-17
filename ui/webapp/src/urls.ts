export const SUGGEST_RECIPE_URL =
  import.meta.env.VITE_SUGGEST_RECIPE_IMAGE_URL ||
  `${location.protocol}//${window.location.hostname}:3000/suggest-recipe`
