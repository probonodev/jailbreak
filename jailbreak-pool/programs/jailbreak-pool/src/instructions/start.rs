use anchor_lang::prelude::*;

use crate::state::{Tournament, TournamentState};

#[derive(Accounts)]
pub struct StartTournament<'info> {
    pub tournament: Account<'info, Tournament>,
}

pub fn handler(ctx: Context<StartTournament>, initial_pool: u64) -> Result<()> {
    let tournament = &mut ctx.accounts.tournament;
    require_keys_eq!(tournament.authority.key(), Pubkey::default());
    require!(tournament.state == TournamentState::Concluded, JailbreakError::TournamentNotConcluded);
    tournament.state = TournamentState::Running;
    // transfer initial pool tokens to the tournament
    token::transfer(
        CpiContext::new(
            ctx.accounts.token_program.to_account_info(),
            token::Transfer {
                from: ctx.accounts.jailbreak_account.to_account_info(),
                to: tournament.jailbreak_account.to_account_info(),
                authority: tournament.to_account_info(),
            },
        ),
        initial_pool,
    )?;
    tournament.entry_fee = initial_pool * TOURNAMENT_FEE_MULTIPLIER_PCT / 100;
    Ok(())
}
