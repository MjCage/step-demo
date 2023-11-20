export type StepStaking = {
  "version": "0.1.1",
  "name": "step_staking",
  "instructions": [
    {
      "name": "initialize",
      "accounts": [
        {
          "name": "tokenMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenVault",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "the not-yet-created, derived token vault pubkey"
          ]
        },
        {
          "name": "initializer",
          "isMut": true,
          "isSigner": true,
          "docs": [
            "pays rent on the initializing accounts"
          ]
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "used by anchor for init of the token"
          ]
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "nonce",
          "type": "u8"
        }
      ]
    },
    {
      "name": "withdrawNested",
      "docs": [
        "In the case that somehow someone sends token to the vaults address but",
        "uses an ATA and the funds are at the ATA of the vault, this crank pulls",
        "it back out and into the vault.",
        "No authority or signer is required for this call.  It is a crank which",
        "always does the exact same thing regardless of caller."
      ],
      "accounts": [
        {
          "name": "refundee",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenVault",
          "isMut": true,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "type": "publicKey",
                "account": "Mint",
                "path": "token_mint"
              }
            ]
          }
        },
        {
          "name": "tokenVaultNestedAta",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "reclaimMintAuthority",
      "docs": [
        "Set the mint authority of xSTEP to the mint authority of the STEP token",
        "This would be used for some rescue type operation, or deprecation of this program",
        "After calling this operation with the correct keys (signed by the STEP mint auth)",
        "This program would no longer function unless the mint authority were set",
        "back to ANYxxG365hutGYaTdtUQG8u2hC4dFX9mFHKuzy9ABQJi"
      ],
      "accounts": [
        {
          "name": "tokenMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "xTokenMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenVault",
          "isMut": true,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "type": "publicKey",
                "account": "Mint",
                "path": "token_mint"
              }
            ]
          }
        },
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true,
          "docs": [
            "the mint authority of the step token"
          ]
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "nonce",
          "type": "u8"
        }
      ]
    },
    {
      "name": "stake",
      "accounts": [
        {
          "name": "tokenMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "xTokenMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenFrom",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenFromAuthority",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "tokenVault",
          "isMut": true,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "type": "publicKey",
                "account": "Mint",
                "path": "token_mint"
              }
            ]
          }
        },
        {
          "name": "xTokenTo",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "nonce",
          "type": "u8"
        },
        {
          "name": "amount",
          "type": "u64"
        }
      ]
    },
    {
      "name": "unstake",
      "accounts": [
        {
          "name": "tokenMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "xTokenMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "xTokenFrom",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "xTokenFromAuthority",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "tokenVault",
          "isMut": true,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "type": "publicKey",
                "account": "Mint",
                "path": "token_mint"
              }
            ]
          }
        },
        {
          "name": "tokenTo",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "nonce",
          "type": "u8"
        },
        {
          "name": "amount",
          "type": "u64"
        }
      ]
    },
    {
      "name": "emitPrice",
      "accounts": [
        {
          "name": "tokenMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "xTokenMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenVault",
          "isMut": true,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "type": "publicKey",
                "account": "Mint",
                "path": "token_mint"
              }
            ]
          }
        }
      ],
      "args": []
    }
  ],
  "events": [
    {
      "name": "PriceChange",
      "fields": [
        {
          "name": "oldStepPerXstepE9",
          "type": "u64",
          "index": false
        },
        {
          "name": "oldStepPerXstep",
          "type": "string",
          "index": false
        },
        {
          "name": "newStepPerXstepE9",
          "type": "u64",
          "index": false
        },
        {
          "name": "newStepPerXstep",
          "type": "string",
          "index": false
        }
      ]
    },
    {
      "name": "Price",
      "fields": [
        {
          "name": "stepPerXstepE9",
          "type": "u64",
          "index": false
        },
        {
          "name": "stepPerXstep",
          "type": "string",
          "index": false
        }
      ]
    }
  ]
};

export const IDL: StepStaking = {
  "version": "0.1.1",
  "name": "step_staking",
  "instructions": [
    {
      "name": "initialize",
      "accounts": [
        {
          "name": "tokenMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenVault",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "the not-yet-created, derived token vault pubkey"
          ]
        },
        {
          "name": "initializer",
          "isMut": true,
          "isSigner": true,
          "docs": [
            "pays rent on the initializing accounts"
          ]
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "used by anchor for init of the token"
          ]
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "nonce",
          "type": "u8"
        }
      ]
    },
    {
      "name": "withdrawNested",
      "docs": [
        "In the case that somehow someone sends token to the vaults address but",
        "uses an ATA and the funds are at the ATA of the vault, this crank pulls",
        "it back out and into the vault.",
        "No authority or signer is required for this call.  It is a crank which",
        "always does the exact same thing regardless of caller."
      ],
      "accounts": [
        {
          "name": "refundee",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenVault",
          "isMut": true,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "type": "publicKey",
                "account": "Mint",
                "path": "token_mint"
              }
            ]
          }
        },
        {
          "name": "tokenVaultNestedAta",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "reclaimMintAuthority",
      "docs": [
        "Set the mint authority of xSTEP to the mint authority of the STEP token",
        "This would be used for some rescue type operation, or deprecation of this program",
        "After calling this operation with the correct keys (signed by the STEP mint auth)",
        "This program would no longer function unless the mint authority were set",
        "back to ANYxxG365hutGYaTdtUQG8u2hC4dFX9mFHKuzy9ABQJi"
      ],
      "accounts": [
        {
          "name": "tokenMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "xTokenMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenVault",
          "isMut": true,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "type": "publicKey",
                "account": "Mint",
                "path": "token_mint"
              }
            ]
          }
        },
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true,
          "docs": [
            "the mint authority of the step token"
          ]
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "nonce",
          "type": "u8"
        }
      ]
    },
    {
      "name": "stake",
      "accounts": [
        {
          "name": "tokenMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "xTokenMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenFrom",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenFromAuthority",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "tokenVault",
          "isMut": true,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "type": "publicKey",
                "account": "Mint",
                "path": "token_mint"
              }
            ]
          }
        },
        {
          "name": "xTokenTo",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "nonce",
          "type": "u8"
        },
        {
          "name": "amount",
          "type": "u64"
        }
      ]
    },
    {
      "name": "unstake",
      "accounts": [
        {
          "name": "tokenMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "xTokenMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "xTokenFrom",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "xTokenFromAuthority",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "tokenVault",
          "isMut": true,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "type": "publicKey",
                "account": "Mint",
                "path": "token_mint"
              }
            ]
          }
        },
        {
          "name": "tokenTo",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "nonce",
          "type": "u8"
        },
        {
          "name": "amount",
          "type": "u64"
        }
      ]
    },
    {
      "name": "emitPrice",
      "accounts": [
        {
          "name": "tokenMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "xTokenMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenVault",
          "isMut": true,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "type": "publicKey",
                "account": "Mint",
                "path": "token_mint"
              }
            ]
          }
        }
      ],
      "args": []
    }
  ],
  "events": [
    {
      "name": "PriceChange",
      "fields": [
        {
          "name": "oldStepPerXstepE9",
          "type": "u64",
          "index": false
        },
        {
          "name": "oldStepPerXstep",
          "type": "string",
          "index": false
        },
        {
          "name": "newStepPerXstepE9",
          "type": "u64",
          "index": false
        },
        {
          "name": "newStepPerXstep",
          "type": "string",
          "index": false
        }
      ]
    },
    {
      "name": "Price",
      "fields": [
        {
          "name": "stepPerXstepE9",
          "type": "u64",
          "index": false
        },
        {
          "name": "stepPerXstep",
          "type": "string",
          "index": false
        }
      ]
    }
  ]
};
