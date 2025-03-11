/**
 * Program IDL in camelCase format in order to be used in JS/TS.
 *
 * Note that this is only a type helper and is not the actual IDL. The original
 * IDL can be found at `target/idl/elearn.json`.
 */
export type Elearn = {
  "address": "93XaPPTDiKJGfzSKkHHLn3uu8gpgAUXwhVWR74ps8dgJ",
  "metadata": {
    "name": "elearn",
    "version": "0.1.0",
    "spec": "0.1.0",
    "description": "Created with Anchor"
  },
  "instructions": [
    {
      "name": "addManager",
      "discriminator": [
        125,
        38,
        192,
        212,
        101,
        91,
        179,
        16
      ],
      "accounts": [
        {
          "name": "admin",
          "writable": true,
          "signer": true
        },
        {
          "name": "adminProof",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  109,
                  97,
                  110,
                  97,
                  103,
                  101,
                  114,
                  45,
                  115,
                  101,
                  101,
                  100
                ]
              },
              {
                "kind": "account",
                "path": "admin"
              }
            ]
          }
        },
        {
          "name": "managerKey"
        },
        {
          "name": "managerProof",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  109,
                  97,
                  110,
                  97,
                  103,
                  101,
                  114,
                  45,
                  115,
                  101,
                  101,
                  100
                ]
              },
              {
                "kind": "account",
                "path": "managerKey"
              }
            ]
          }
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "managerBump",
          "type": "u8"
        }
      ]
    },
    {
      "name": "createBatch",
      "discriminator": [
        159,
        198,
        248,
        43,
        248,
        31,
        235,
        86
      ],
      "accounts": [
        {
          "name": "manager",
          "writable": true,
          "signer": true
        },
        {
          "name": "managerProof",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  109,
                  97,
                  110,
                  97,
                  103,
                  101,
                  114,
                  45,
                  115,
                  101,
                  101,
                  100
                ]
              },
              {
                "kind": "account",
                "path": "manager"
              }
            ]
          }
        },
        {
          "name": "batch",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  98,
                  97,
                  116,
                  99,
                  104,
                  45,
                  115,
                  101,
                  101,
                  100
                ]
              },
              {
                "kind": "account",
                "path": "manager"
              },
              {
                "kind": "account",
                "path": "manager_proof.batch_count",
                "account": "manager"
              }
            ]
          }
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "batchName",
          "type": "string"
        },
        {
          "name": "batchBump",
          "type": "u8"
        }
      ]
    },
    {
      "name": "createCertificate",
      "discriminator": [
        238,
        189,
        143,
        29,
        100,
        80,
        70,
        10
      ],
      "accounts": [
        {
          "name": "manager",
          "writable": true,
          "signer": true
        },
        {
          "name": "managerProof",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  109,
                  97,
                  110,
                  97,
                  103,
                  101,
                  114,
                  45,
                  115,
                  101,
                  101,
                  100
                ]
              },
              {
                "kind": "account",
                "path": "manager"
              }
            ]
          }
        },
        {
          "name": "batch",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  98,
                  97,
                  116,
                  99,
                  104,
                  45,
                  115,
                  101,
                  101,
                  100
                ]
              },
              {
                "kind": "account",
                "path": "manager"
              },
              {
                "kind": "account",
                "path": "batch.batch_num",
                "account": "batch"
              }
            ]
          }
        },
        {
          "name": "certificate",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  99,
                  101,
                  114,
                  116,
                  105,
                  102,
                  105,
                  99,
                  97,
                  116,
                  101,
                  45,
                  115,
                  101,
                  101,
                  100
                ]
              },
              {
                "kind": "account",
                "path": "batch"
              },
              {
                "kind": "account",
                "path": "batch.certificate_count",
                "account": "batch"
              }
            ]
          }
        },
        {
          "name": "studentKey"
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "completeDate",
          "type": "u64"
        },
        {
          "name": "certificateBump",
          "type": "u8"
        },
        {
          "name": "studentName",
          "type": "string"
        },
        {
          "name": "studentGrade",
          "type": "string"
        },
        {
          "name": "courseName",
          "type": "string"
        },
        {
          "name": "schoolName",
          "type": "string"
        },
        {
          "name": "schoolUri",
          "type": "string"
        },
        {
          "name": "issuerName",
          "type": "string"
        },
        {
          "name": "issuerRole",
          "type": "string"
        },
        {
          "name": "issuerUri",
          "type": "string"
        }
      ]
    },
    {
      "name": "initializeManager",
      "discriminator": [
        79,
        37,
        249,
        89,
        35,
        188,
        238,
        111
      ],
      "accounts": [
        {
          "name": "master",
          "writable": true,
          "signer": true,
          "address": "JakevMAR7R4Evr4PZpTqNAb1KkVXAskzYohd1vxEUqj"
        },
        {
          "name": "managerProof",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  109,
                  97,
                  110,
                  97,
                  103,
                  101,
                  114,
                  45,
                  115,
                  101,
                  101,
                  100
                ]
              },
              {
                "kind": "account",
                "path": "master"
              }
            ]
          }
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "managerBump",
          "type": "u8"
        }
      ]
    },
    {
      "name": "modifyManager",
      "discriminator": [
        99,
        219,
        194,
        56,
        177,
        219,
        24,
        68
      ],
      "accounts": [
        {
          "name": "admin",
          "writable": true,
          "signer": true
        },
        {
          "name": "adminProof",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  109,
                  97,
                  110,
                  97,
                  103,
                  101,
                  114,
                  45,
                  115,
                  101,
                  101,
                  100
                ]
              },
              {
                "kind": "account",
                "path": "admin"
              }
            ]
          }
        },
        {
          "name": "managerKey"
        },
        {
          "name": "managerProof",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  109,
                  97,
                  110,
                  97,
                  103,
                  101,
                  114,
                  45,
                  115,
                  101,
                  101,
                  100
                ]
              },
              {
                "kind": "account",
                "path": "managerKey"
              }
            ]
          }
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "targetPermissions",
          "type": "u8"
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "batch",
      "discriminator": [
        156,
        194,
        70,
        44,
        22,
        88,
        137,
        44
      ]
    },
    {
      "name": "certificate",
      "discriminator": [
        202,
        229,
        222,
        220,
        116,
        20,
        74,
        67
      ]
    },
    {
      "name": "manager",
      "discriminator": [
        221,
        78,
        171,
        233,
        213,
        142,
        113,
        56
      ]
    }
  ],
  "types": [
    {
      "name": "batch",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "managerKey",
            "type": "pubkey"
          },
          {
            "name": "certificateCount",
            "type": "u64"
          },
          {
            "name": "batchNum",
            "type": "u64"
          },
          {
            "name": "batchName",
            "type": "string"
          },
          {
            "name": "batchBump",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "certificate",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "batchPda",
            "type": "pubkey"
          },
          {
            "name": "managerKey",
            "type": "pubkey"
          },
          {
            "name": "studentKey",
            "type": "pubkey"
          },
          {
            "name": "completeDate",
            "type": "u64"
          },
          {
            "name": "certificateNum",
            "type": "u64"
          },
          {
            "name": "certificateBump",
            "type": "u8"
          },
          {
            "name": "studentName",
            "type": "string"
          },
          {
            "name": "studentGrade",
            "type": "string"
          },
          {
            "name": "courseName",
            "type": "string"
          },
          {
            "name": "schoolName",
            "type": "string"
          },
          {
            "name": "schoolUri",
            "type": "string"
          },
          {
            "name": "issuerName",
            "type": "string"
          },
          {
            "name": "issuerRole",
            "type": "string"
          },
          {
            "name": "issuerUri",
            "type": "string"
          }
        ]
      }
    },
    {
      "name": "manager",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "managerKey",
            "type": "pubkey"
          },
          {
            "name": "batchCount",
            "type": "u64"
          },
          {
            "name": "certificateCount",
            "type": "u128"
          },
          {
            "name": "permissionType",
            "type": "u8"
          },
          {
            "name": "managerBump",
            "type": "u8"
          }
        ]
      }
    }
  ]
};
