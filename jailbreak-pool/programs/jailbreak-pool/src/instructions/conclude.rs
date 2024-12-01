use anchor_lang::prelude::*;

use crate::state::{Tournament, TournamentState};

#[derive(Accounts)]
pub struct ConcludeTournament<'info> {
    pub tournament: Account<'info, Tournament>,
}

pub fn handler(ctx: Context<ConcludeTournament>, winner: Pubkey) -> Result<()> {
    let tournament = &mut ctx.accounts.tournament;
    require_keys_eq!(tournament.authority.key(), Pubkey::default());

    // update state
    require!(tournament.state == TournamentState::Running, JailbreakPoolError::TournamentNotRunning);
    tournament.state = TournamentState::Concluded;

    // pay out the winner
    let tokens_held = token::get_balance(ctx.accounts.tournament_token_account.to_account_info());
    let payout = tokens_held * TOURNAMENT_PAYOUT_PCT / 100;
    token::transfer(
        CpiContext::new(
            ctx.accounts.token_program.to_account_info(),
            token::Transfer {
                from: tournament.jailbreak_account.to_account_info(),
                to: winner.to_account_info(),
                authority: tournament.to_account_info(),
            },
        ),
        tokens_held,
    )?;

    // pay out the rest of the pool to deployer
    let deployer_payout = tokens_held - payout;
    token::transfer(
        CpiContext::new(
            ctx.accounts.token_program.to_account_info(),
            token::Transfer {
                from: tournament.jailbreak_account.to_account_info(),
                to: ctx.accounts.deployer.to_account_info(),
                authority: tournament.to_account_info(),
            },
        ),
        deployer_payout,
    )?;
    Ok(())
}