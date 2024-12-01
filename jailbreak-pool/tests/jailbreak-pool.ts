import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
const assert = require("assert");
import { Tournament } from "../target/types/tournament";

describe("tournament", () => {
  // Configure the client to use the local cluster.
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);

  const program = anchor.workspace.Tournament as Program<Tournament>;
  const init_seed = anchor.utils.bytes.utf8.encode("tournament");
  
  let tournamentPubKey;

  beforeEach(async () => {
    [tournamentPubKey] = await anchor.web3.PublicKey.findProgramAddressSync(
      [init_seed],
      program.programId
    );
    console.log("tournamentPubKey", tournamentPubKey.toString());
  });

  it("runs the constructor", async () => {
    await program.methods.initialize().accounts({
      tournament: tournamentPubKey,
      authority: provider.wallet.publicKey,
      systemProgram: anchor.web3.SystemProgram.programId,
    })
    .rpc();
    const tournamentAccount = await program.account.tournament.fetch(tournamentPubKey);
    assert.equal(tournamentAccount.authority, provider.wallet.publicKey.toString());
  });

  it("Starts a tournament", async () => {
  });

  it("Submits some solutions", async () => {
  });

  it("Concludes a tournament", async () => {
  });

  it("Starts a second tournament", async () => {
  });
  
  it("Concludes a second tournament", async () => {
  });
});
