export async function wait(ms: number): Promise<void> {
  return new Promise((resolve, _) => {
    setTimeout(() => {
      resolve();
    }, ms);
  });
}
