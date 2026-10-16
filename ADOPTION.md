# ADOPTION — postcss-rtlcss (STEADYWRK estate)

Fork of [`elchininet/postcss-rtlcss`](https://github.com/elchininet/postcss-rtlcss). Adopted 2026-08-23 by the `moat` lane.
Estate record: `docs/strategy/OSS-ADOPTION-2026-08-23.md` in `karimalsalah/steadywrk` (PR #1465).

## What it is (verified live 2026-08-23)

Apache-2.0 · 135★ · last push 2026-08-23 · not archived · not a fork.
TypeScript, npm package, **1.5 MB** of tracked files in this checkout (measured 2026-10-08; the earlier 2.2 MB figure was not reproduced), entry `src/index.ts`. A **PostCSS plugin** — it transforms LTR CSS into RTL/bidirectional CSS at build time.

## Why we took it

steadywrk claims an **Arabic-first design position**, not a translated one. Live competitive research on 2026-08-23 found that *"Arabic and RTL agent readiness is unclaimed"* and that **no storefront scanner in the competitive set names Salla or Zid**. A design position has to be mechanically enforced or it decays into a claim. This makes RTL correctness a build step instead of a review checklist.

**What we take:** the transformation engine and its handling of directional properties, not the CLI wrapper.

## Sequencing

**First of the five**, deliberately — it is the lowest-risk adoption in the set: build-time only, no runtime component, no network path, no credential surface. It is the right fork to prove the adoption controls themselves work before applying them to anything with an egress or credential surface.

## Isolation

| Control | This fork |
|---|---|
| **Sandbox root** | `D:\forks\postcss-rtlcss` on the ReFS Dev Drive. Never `C:`, never `~/.claude`, never `~/.cursor`. |
| **Kill-switch** | Delete `D:\forks\postcss-rtlcss`. Nothing else to unwind — it registers no service, no scheduled task, no global config. |
| **Credentials** | **None.** Never give it `ANTHROPIC_API_KEY`, `OPENAI_API_KEY`, or any production key. It has no legitimate use for a credential. |
| **Egress** | Expected **none at runtime** — it is a pure build-time transform. `npm install` reaches the registry; the plugin itself should not open a socket. **This expectation is unverified and must be tested, not trusted.** |
| **Writes** | Expected: CSS output only, within the build output directory. |

## Required before any integration — the dry-run gate

Nothing from this fork lands in steadywrk until all four pass.

**Status (2026-10-08): open.** No item is recorded as complete in this repo. Item 2 has partial runtime-level evidence only: a transform run made no fs, net, dns or http calls for the options exercised. That is not an OS-level egress check.

**2026-10-16:** merged upstream `elchininet/postcss-rtlcss` master (7b2619c) and refreshed dev dependencies; the plugin source and runtime dependency (`rtlcss` 4.3.0) are unchanged by the merge. The dry-run gate below has not been run against this version and still needs running before any integration.


1. **Filesystem diff.** Snapshot `~/.claude`, `~/.cursor/mcp.json` (hash), and the home root **before and after** first run; diff. Do **not** rely on documentation claiming it writes nothing outside its own directory.
2. **Egress check.** Confirm no network connections during a transform run (installation excluded).
3. **Capability proof.** Transform a real steadywrk stylesheet and inspect the output. **The repo's README claims are NOT yet verified** — only its license, liveness, and non-archived status are.
4. **Output review.** RTL output reviewed by someone who reads Arabic. A mechanically-correct mirror can still be typographically wrong, and this fork exists to serve Arabic readers, not to satisfy a linter.

## Why the filesystem diff is mandatory even here

On 2026-08-23 the estate adopted another tool whose **five documented isolation flags were each tested and each failed** to contain a write outside its sandbox. Only a before/after filesystem diff caught it. The governing rule that came out of that: **documented isolation is not proof of isolation**, and a `doctor`/`status`/read-only-sounding subcommand can still write outside its sandbox.

This fork is very unlikely to misbehave. The control is applied anyway — a control that is only run when it is expected to fail is not a control.

## Never

- Point it at, or install it into, the live `C:\Users\youso\dev\steadywrk` checkout (Cursor's working tree).
- Install into `~/.claude/skills` or register anything in `~/.cursor/mcp.json`.
- Merge upstream blindly. Re-run the dry-run gate after every version bump — **containment is empirical, not contractual.**

## Upstream

`origin` is `karimalsalah/postcss-rtlcss`. No upstream remote is configured in this checkout, so tracking `elchininet/postcss-rtlcss` is not in effect yet. To track it, run `git remote add upstream https://github.com/elchininet/postcss-rtlcss`. We do not push to upstream. Any fix worth contributing goes upstream as a normal PR under its Apache-2.0 terms.
