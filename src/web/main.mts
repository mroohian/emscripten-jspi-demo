import initTest1 from '@wasm/test1';

await initTest1();

async function main() {
  console.log(globalThis.Test1Module.execute());

  const result = await Test1Module.executeAsync();

  console.log(result);
}

await main();
