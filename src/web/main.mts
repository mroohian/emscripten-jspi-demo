import Test1ModuleFactory from '@wasm/test1';

async function main() {
  const Test1Module = await Test1ModuleFactory();

  console.log(Test1Module.execute());

  const result = await Test1Module.executeAsync();

  console.log(result);
}

void main()