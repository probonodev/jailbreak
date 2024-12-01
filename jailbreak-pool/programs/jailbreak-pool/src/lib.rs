pub mod error;
pub mod instructions;
pub mod state;

use anchor_lang::prelude::*;
use instructions::*;

declare_id!("5tB932mS8f6o9H8FZzzKmcPkGShKUAkCxeKpf4TMdfQP");

#[program]
pub mod tournament {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        instructions::initialize::handler(ctx)
    }

    pub fn start_tournament(ctx: Context<StartTournament>, system_prompt_hash: Hash) -> Result<()> {
        instructions::start::handler(ctx, system_prompt_hash)
    }

    pub fn conclude_tournament(ctx: Context<ConcludeTournament>) -> Result<()> {
        instructions::conclude::handler(ctx)
    }

    pub fn submit_solution(ctx: Context<SubmitSolution>, solution_hash: Hash) -> Result<()> {
        instructions::submit::handler(ctx, solution_hash)
    }
}

