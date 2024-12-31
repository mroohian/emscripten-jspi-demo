#include <iostream>
#include <emscripten.h>
#include <emscripten/bind.h>

#include "calc.hpp"
#include "js-library.hpp"

int execute() {
    int a = add(1,2);
    int b = sub(2,1);
    
    std::cout << "1+2 => " << a << std::endl;
    my_js();
    std::cout << "2-1 => " << b << std::endl;
    
    if (a != 3) {
        std::cerr << "Invalid add" << std::endl;
        return -1;
    }
    if (b != 1) {
        std::cerr << "Invalid sub" << std::endl;
        return -1;
    }

    return a + b;
}

int execute_async() {
    std::cout << "1. waiting... " << std::endl;
    emscripten_sleep(1000);

    std::cout << "2. waiting... " << std::endl;
    emscripten_sleep(1000);

    std::cout << "3. waiting... " << std::endl;
    emscripten_sleep(1000);

    return execute();
}

EMSCRIPTEN_BINDINGS(test1) {
    emscripten::function("execute", &execute);
    emscripten::function("executeAsync", &execute_async, emscripten::async());
}