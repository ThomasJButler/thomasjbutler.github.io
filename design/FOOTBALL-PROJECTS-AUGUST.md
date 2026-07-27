# Football projects: The Kicker and The Premier League Oracle

**Parked until the Premier League season restarts in August 2026.**

Deliberately, and for a good reason: there are no live fixtures right now, so any screenshot of
either app shows empty match cards, no live ticker, no in-play scores and a prediction grid with
nothing to predict. Both projects are at their least convincing in the off-season, and shooting
them now would produce artwork that undersells them and then has to be redone anyway.

Split out of `ASSET-RECUT-LIST.md` so that list stays a live queue of things blocking the launch.
Nothing in here blocks anything. The site is correct today: both projects have their own card,
their copy matches their repos, and the only outstanding work is artwork.

## What is already done

- The Oracle is back as its own card, `premier-league-oracle`, with copy taken from its README.
- The Kicker is `the-kicker`, keeps the broadsheet artwork, and carries no links until its repo
  is public and it has a deployment.
- Both ids now match their names, which they did not before.
- The Kicker's `highlights` were corrected off the stale five-model description.

Everything below is artwork only.

---

Not a delivery problem. The site had **one card carrying The Kicker's name and the Oracle's
repo and demo**, so the working, public, deployed project was showing under the name of the
unreleased one. They are two projects that share the Butler model: the Oracle is the analytical
platform, The Kicker is the broadsheet with ten AI columnists. Both now have their own card,
and the ids match the names.

## 17. `the-kicker.png`, `diagram-kicker.png` · a superseded engine · MEDIUM

The cover reads **"FIVE MODELS · ELO · POISSON · FORM / H2H · TABLE -> XGBOOST"**, and the
diagram draws the same five feeding an ensemble. The engine was swapped: the live code goes
through `butlerFacade.ts` to the **Butler model**, a time-decayed Dixon-Coles fitted over 33
seasons, and the five-model framing now survives only in April plan docs under
`docs/superpowers/plans/`. The Oracle's own last commit message reads "engine swapped".

The card's `highlights` have been corrected. The **captions were deliberately left alone**,
because a caption describes the image it sits under and those images really do draw five
models. Fixing the caption without the image would just move the contradiction.

**Fix:** re-cut both to the Butler model. Two figures on the cover also want checking against
the repo before they are redrawn: **"MODEL ACCURACY 75%, last 40 predictions"** and
**"MODEL EDGE +7450pp vs market"**. The second in particular reads oddly as a unit.

**Also:** `wireframe-kicker.png` and its caption describe a newsreader. The Kicker's README
describes a tabloid broadsheet with AI columnists and no newsreader, so that may be a leftover
from when this card was the Oracle. Worth a look while the set is open.

## 18. The Premier League Oracle · no artwork at all · LOW

Now its own card and taking `ProjectCover`'s generated fallback panel, which is the case that
fallback was kept for. It renders tidily and says `> premier-league-oracle — cover incoming`,
so nothing is broken, but it is the only card on the page without a real cover.

If it gets a set, the material is unusually good and all of it is in the repo's README:

- The **Butler model**: time-decayed, shrinkage-regularised Dixon-Coles, penalised maximum
  likelihood over 33 seasons, calibrated walk-forward out-of-sample.
- A few **kilobytes of fitted coefficients running entirely in the browser**, with an optional
  XGBoost backend blending on the log-odds scale.
- **RPS 0.2000 over 2,660 matches (2018-2025) against a bookmaker closing-odds ceiling of
  0.1939**, with a CI gate that fails any change making predictions worse. Publishing the gap
  to the market is the most honest thing on the whole site: it is a measured loss, stated.
- The **Football-Data.org key stays in the browser**, and the free tier is 10 requests a minute.
  That is a genuine metered boundary, so the amber rule applies cleanly.
- The README's own **"Honest limitations"** section, which is exactly this site's voice already.

---


## When August comes

Worth shooting both apps on a real matchday rather than any weekday: live scores, the ticker
mid-update, and a fixture where the model and the market disagree. The Oracle's whole argument
is that it publishes its own accuracy against the bookmakers, and that argument is far easier to
draw when there is a live number moving next to it.
