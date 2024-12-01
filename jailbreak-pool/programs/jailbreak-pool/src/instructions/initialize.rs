use anchor_lang::prelude::*;

use crate::state::*;
use anchor_spl::token::{self, Mint, Token, TokenAccount};

#[derive(Accounts)]
pub struct Initialize<'info> {
    #[account(init,
        payer = authority,
        space = 8 + Tournament::MAX_SIZE,
        seeds = [b"tournament"],
        bump
    )]
    pub tournament: Account<'info, Tournament>,
    #[account(mut)]
    pub authority: Signer<'info>,
    pub system_program: Program<'info, System>,

    #[account(
        constraint = tournament_mint.key() == TOURNAMENT_COIN
    )]
    pub tournament_mint: Account<'info, Mint>,
    #[account(init,
        payer = authority,
        seeds = [b"jailbreak_token_account"],
        bump,
        token::mint = tournament_mint,
        token::authority = tournament,
    )]
    pub jailbreak_account: Account<'info, TokenAccount>,
}

pub fn handler(ctx: Context<Initialize>) -> Result<()> {
    let tournament = &mut ctx.accounts.tournament;
    require_keys_eq!(tournament.authority.key(), Pubkey::default());
    tournament.authority = ctx.accounts.authority.key();
    tournament.state = TournamentState::Concluded;

    Ok(())
}
