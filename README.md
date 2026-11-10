# When a strict AI agent rule traps the agent: interactive demo

Live: https://qnfo.github.io/paper-demo-agent-deadlock/

Companion to [Specification-Induced Deadlock in Zero-Tolerance Agent Protocols](https://papers.qnfo.org/papers/specification-induced-deadlock-in-zero-tolerance-agent-protocols-a-state-machine).
Play the agent: pick the zero-tolerance rule or the escape-hatch repair, mark tools working, blocked or missing, and watch the (requirement, capability, invocation) state machine reach, or avoid, the deadlock state D = (1,1,0).

Toy model of the paper's compliance table; it runs no real AI model. Technology readiness level 1-2.

```
node --test js/machine.test.mjs   # reads the machine out of index.html
```

MIT licence. Static single file, no build, no tracking.
