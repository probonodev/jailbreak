use anchor_lang::prelude::*;
use anchor_spl::token::{self, Token, TokenAccount};

use crate::state::{Tournament, TournamentState};
use crate::error::ErrorCode;

#[derive(Accounts)]
pub struct SubmitSolution<'info> {
    #[account(mut)]
    pub tournament: Account<'info, Tournament>,
    #[account(mut)]
    pub submitter: Signer<'info>,
    #[account(mut)]
    pub submitter_token_account: Account<'info, TokenAccount>,
}

pub fn handler(ctx: Context<SubmitSolution>, solution_hash: Hash) -> Result<()> {
    let tournament = &mut ctx.accounts.tournament;
    let amount_paid = tournament.entry_fee;

    // Check that the tournament is accepting submissions
    if tournament.state != TournamentState::Running {
        return Err(ErrorCode::TournamentNotRunning.into());
    }
    
    // Transfer tokens from submitter to tournament account
    token::transfer(
        CpiContext::new(
            ctx.accounts.token_program.to_account_info(),
            token::Transfer {
                from: ctx.accounts.submitter_token_account.to_account_info(),
                to: ctx.accounts.tournament_token_account.to_account_info(),
                authority: ctx.accounts.submitter.to_account_info()
            },
        ),
        amount_paid,
    )?;

    tournament.entry_fee += amount_paid * TOURNAMENT_FEE_MULTIPLIER_PCT / 100;

    emit!(SolutionSubmitted {
        // address of submitter
        submitter: ctx.accounts.submitter.key(),
        // sha256 hash of solution
        solution_hash,
        // amount paid
        amount_paid,
    });
    Ok(())
}

