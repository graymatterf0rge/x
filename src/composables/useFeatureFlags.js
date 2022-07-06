export const FeatureFlagsSymbol = Symbol();

export const useFeatureFlags = (flags) => {
  if (!flags) {
    throw new Error("please pass flags as an Array or Object");
  }
  provide(FeatureFlagsSymbol, flags);

  return {
    flags,
  };
};
