cmake_minimum_required(VERSION 3.22)

add_compile_options(-std=c++17)
set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED ON)

project(TestProject)

if(NOT EMSCRIPTEN)
    message(FATAL_ERROR "EMSCRIPTEN is not imported. Use emcmake instead of cmake.")
endif()

file(GLOB_RECURSE HDR_FILES src/wasm/*.h src/wasm/*.hpp)
file(GLOB_RECURSE SRC_FILES src/wasm/*.cpp src/wasm/*.c)

add_executable(test1 ${SRC_FILES} ${HDR_FILES})
set_target_properties(test1 PROPERTIES COMPILE_FLAGS "-g -s SIDE_MODULE=1")
set_target_properties(test1 PROPERTIES LINK_FLAGS 
    "-gsource-map 
    -lembind 
    --emit-tsd test1.d.ts 
    --pre-js ${CMAKE_CURRENT_LIST_DIR}/wasm-build/pre.js 
    --post-js ${CMAKE_CURRENT_LIST_DIR}/wasm-build/post.js 
    --js-library ${CMAKE_CURRENT_LIST_DIR}/wasm-build/js-library.js 
    -s EXPORT_NAME=Test1Module 
    -s JSPI 
    -s STRICT 
    -s USE_ES6_IMPORT_META 
    -s MODULARIZE 
    -s EXPORT_ES6=1 
    --no-entry")
