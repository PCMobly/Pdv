{
  "targets": [
    {
      "target_name": "nodesat",
      "cflags!": [ "-fno-exceptions" ],
      "cflags_cc!": [ "-fno-exceptions" ],
      "msvs_settings": {
        "VCCLCompilerTool": { "ExceptionHandling": 1 },
      },
      "conditions": [
        [
          'OS=="win"',
          {
            "defines": [
              "_HAS_EXCEPTIONS=1"
              ],
            "win_delay_load_hook": "true"
          }
        ]
      ],
      "sources": [
        "libDll/promises/*",
        "libDll/nodesat.hpp",
        "libDll/nodesat.cpp"
      ],
      "include_dirs": [
        "<!@(node -p \"require('node-addon-api').include\")"
      ],
      'defines': [ 'NAPI_DISABLE_CPP_EXCEPTIONS' ],
    }
  ]
}
