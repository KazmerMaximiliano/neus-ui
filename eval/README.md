# Design evaluation

Five fixed briefs measure what the neus-design skill produces. Each phase of the AI
design work ends with a full run of all five, compared against the previous run and
against Claude Design. Nothing here ships in the npm package.

| Path | Contents |
| --- | --- |
| `briefs/` | The prompts, pasted verbatim into the agent. Front matter: `id`, `surface` (page or app) and the `route` to capture |
| `rubric.md` | Scoring axes, the head-to-head comparison and the cut of each phase |
| `score.mjs` | Captures a finished project with `neus shot`, copies its code and builds the summary |
| `reference/<brief>/` | Claude Design screenshots for each brief, added by hand |
| `runs/<label>/<brief>/` | One run: `metrics.json`, `shots/`, `code/` and the hand-written `scores.json` |
| `runs/<label>/summary.md` | One row per brief, rebuilt by `score.mjs` |

## Run one brief

1. Pack the library from this repository:

   ```bash
   pnpm build && pnpm pack        # writes neus-ui-<version>.tgz
   ```

2. Create a clean project outside this repository, one per brief, so runs never
   share code:

   ```bash
   pnpm create vite ../neus-eval/baseline-01 --template react-ts
   cd ../neus-eval/baseline-01
   pnpm add ../../neus-ui/neus-ui-*.tgz
   npx neus init --yes --system neus --language es --agents claude
   ```

3. Start a new agent session in that project and paste the brief body, without
   adding instructions. When the skill asks questions, pick its recommended answer.
   Do not intervene until it delivers.

4. Score it from this repository:

   ```bash
   node eval/score.mjs ../neus-eval/baseline-01 --brief 01 --label baseline
   ```

   It runs `neus shot` on the brief's route (reusing the server the session left,
   or starting the project's dev script), stops the server, and saves the
   screenshots, the metrics and a copy of the code in `runs/baseline/01/`.

5. Open the screenshots, fill `runs/baseline/01/scores.json` following `rubric.md`,
   and rebuild the summary:

   ```bash
   node eval/score.mjs --label baseline
   ```

Use one label per run of the five briefs, for example `baseline`, `phase-1`,
`phase-2`. Runs are committed so later phases can be compared, and re-scored once
new checks such as `neus lint` exist. To measure a version that predates a change,
pack that commit instead.
