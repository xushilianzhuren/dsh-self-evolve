# dsh-self-evolve

**Self-evolution governance guard** — one endpoint that audits the nine-verb
governance rings of any self-improving agent: learn / evolve / iterate /
reflect / review / evaluate / update / upgrade.

## The two rails (non-negotiable)

1. **No unverified self-improvement** — every improvement claim ships with a
   verifiable metric (correlation against external truth); "it feels better"
   does not ship.
2. **Stop-switch on every ladder** — every autonomous-upgrade path embeds an
   operator one-sentence kill-switch, and the switch grows MORE visible as
   capability grows.

## Use

```bash
dsh plugin add github:<owner>/dsh-self-evolve
curl "http://127.0.0.1:<port>/self-evolve/api?act=rings&root=~/.dsh"
curl "http://127.0.0.1:<port>/self-evolve/api?act=rails"
```

Point `config.root` at your policy directory; put the ring key-phrases into
your policy file and the nine rings turn green. Wire into monthly audit —
a broken ring means the improvement loop is spinning without governance.
