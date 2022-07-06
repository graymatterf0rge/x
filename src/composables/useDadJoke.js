export const Status = {
  IDLE: "IDLE",
  RUNNING: "RUNNING",
  SUCCESS: "SUCCESS",
  ERROR: "ERROR",
};

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

  let status = ref(Status.IDLE);
  let joke = ref(await fetchJoke());

  return {
    joke,
    status,
    refetchJoke,
  };
}
