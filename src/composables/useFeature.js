import { FeatureFlagsSymbol } from "./useFeatureFlags";

export const useFeature = (name) => {
  const flags = inject(FeatureFlagsSymbol);

  if (!flags) {
    throw new Error("There is no FeatureFlag config file");
  }

  const feature = reactive({
    enabled: computed(() =>
      Array.isArray(flags) ? flags.includes(name) : flags[name]
    ),
  });

  return feature;
};
