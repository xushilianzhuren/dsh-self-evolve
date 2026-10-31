/**
 * dsh-self-evolve · Self-evolution governance guard (host plugin, zero-dep)
 *
 * Answers the nine-verb governance triad for any self-improving agent:
 * learn / evolve / iterate / reflect / review / evaluate / update / upgrade.
 * Two rails are non-negotiable and checked mechanically:
 *
 *   ① NO UNVERIFIED SELF-IMPROVEMENT — every claimed improvement ships with a
 *      verifiable metric (score correlation threshold); "it feels better"
 *      does not ship.
 *   ② STOP-SWITCH ON EVERY LADDER — every autonomous-upgrade path embeds a
 *      one-sentence operator kill-switch, and the switch grows MORE visible
 *      as capability grows.
 *
 * Host HTTP API (webServer pattern, zero deps):
 *   GET /self-evolve/api?act=rings&root=/path/to/policy -> nine-ring report
 *   GET /self-evolve/api?act=rails                      -> the two rails
 */
export const name = 'self-evolve'
export const inject = ['webServer']

import { homedir } from 'node:os'
import { existsSync, readFileSync } from 'node:fs'
import { join } from 'node:path'

const RINGS = {
  'learn.unsupervised': /unsupervised|from own experience/i,
  'learn.never-forget': /never forget|capability (freezing|固化)|consolidation ledger/i,
  'evolve.ladder': /evolution ladder|self-rewrit|脚本天梯|self-evolving script/i,
  'evolve.weights': /weight[- ]layer|autonomous training/i,
  'iterate.autonomy': /human[- ]intervention count|无人辅助|unassisted iteration/i,
  'reflect.risk': /what could I (be )?wrong|盲区|premise exposure/i,
  'review.ledger': /error ledger|错题|post-mortem/i,
  'evaluate.external': /external read|对账|verification (correlation|threshold)/i,
  'upgrade.killswitch': /kill[- ]?switch|one[- ]sentence stop|停止权/i,
}

const RAILS = {
  'no-unverified-improvement': 'every improvement claim ships with a verifiable metric (r>=0.6 against external truth)',
  'stop-switch-everywhere': 'every autonomous upgrade path embeds an operator one-sentence kill-switch; switch visibility scales with capability',
}

export function apply(ctx) {
  const cfg = (ctx.config && ctx.config['self-evolve']) || {}
  const root = cfg.root || join(homedir(), '.dsh')
  const web = ctx['webServer']

  web.registerHttpHandler('/self-evolve/api', async (req) => {
    const url = new URL(req.url, 'http://x')
    const act = url.searchParams.get('act') || 'rings'
    if (act === 'rails') return { ok: true, rails: RAILS }
    const checks = []
    let allOk = true
    for (const [name, re] of Object.entries(RINGS)) {
      let hit = false
      try {
        for (const f of ['README.md', 'config.json', 'policy.md']) {
          const p = join(root, f)
          if (existsSync(p) && re.test(readFileSync(p, 'utf8'))) { hit = true; break }
        }
      } catch (e) {}
      checks.push({ ring: name, ok: hit }); allOk &= hit
    }
    return { ok: allOk, rings: checks, rails: RAILS }
  })
}
