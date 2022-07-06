var SplitFactory = require("@splitsoftware/splitio").SplitFactory;
// Instantiate the SDK
var factory = SplitFactory({
  core: {
    authorizationKey: process.env.SPLIT_API_KEY,
    // key represents your internal user id, or the account id that
    // the user belongs to.
    // This could also be a cookie you generate for anonymous users
    key: "key",
  },
});
// And get the client instance you'll use
var client = factory.client();

export default async function useDadJoke() {
  async function fetchJoke() {
    status.value = Status.RUNNING;
    try {
      const res = await fetch("https://icanhazdadjoke.com/", {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      });
      if (!res.ok) {
        status.value = Status.ERROR;
      }
      const json = await res.json();
      status.value = Status.SUCCESS;
      return json;
    } catch (err) {
      status.value = Status.ERROR;

      throw new Error(err);
    }
  }

  async function refetchJoke() {
    joke.value = await fetchJoke();
  }

  let status = $ref(Status.IDLE);
  let joke = $ref(await fetchJoke());

  return {
    joke,
    status,
    refetchJoke,
  };
}
