cmake_minimum_required(VERSION 3.22)

add_compile_options(-std=c++17)
set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED ON)

project(TestProject)

if(NOT EMSCRIPTEN)
    message(FATAL_ERROR "EMSCRIPTEN is not imported. Use emcmake instead of cmake.")
endif()

if(NOT CMAKE_BUILD_TYPE)
    set(CMAKE_BUILD_TYPE Release CACHE STRING "Build type")
endif()

file(GLOB_RECURSE HDR_FILES src/wasm/*.h src/wasm/*.hpp)
file(GLOB_RECURSE SRC_FILES src/wasm/*.cpp src/wasm/*.c)

set(COMMON_COMPILE_FLAGS "-s SIDE_MODULE=1")

set(COMMON_LINK_FLAGS "-lembind \
    --emit-tsd test1.d.ts \
    --js-library ${CMAKE_CURRENT_LIST_DIR}/wasm-build/js-library.js \
    -s EXPORT_NAME=Test1Module \
    -s JSPI=1 \
    -s STRICT=1 \
    -s USE_ES6_IMPORT_META=1 \
    -s MODULARIZE=1 \
    -s WASM_ASYNC_COMPILATION=1 \
    -s EXPORT_ES6=1 \
    --no-entry")

add_executable(test1 ${SRC_FILES} ${HDR_FILES})
if (CMAKE_BUILD_TYPE MATCHES "Debug")
  message(STATUS "Configuring for debug mode")
  set_target_properties(test1 PROPERTIES COMPILE_FLAGS "-g ${COMMON_COMPILE_FLAGS}")
  set_target_properties(test1 PROPERTIES LINK_FLAGS "-gsource-map ${COMMON_LINK_FLAGS}")
else()
  message(STATUS "Configuring for release mode")
  set_target_properties(test1 PROPERTIES COMPILE_FLAGS "${COMMON_COMPILE_FLAGS}")
  set_target_properties(test1 PROPERTIES LINK_FLAGS "-O2 ${COMMON_LINK_FLAGS}")
endif()
