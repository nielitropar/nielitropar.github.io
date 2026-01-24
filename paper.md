---
title: 'NIELIT StudentHub: A Zero-OpEx, Serverless Institutional Knowledge Management System'
tags:
  - JavaScript
  - Google Apps Script
  - serverless architecture
  - frugal engineering
  - distributed systems
  - knowledge management
  - google sheets
  - social graphs
  - portfolio management
authors:
  - name: Lovnish Verma
    orcid: 0009-0009-3992-030X
    equal-contrib: true
    affiliation: 1
  - name: Sarwan Singh
    orcid: 0000-0001-7062-2129
    equal-contrib: true
    affiliation: 1
affiliations:
 - name: National Institute of Electronics & Information Technology (NIELIT), Ropar, India
   index: 1
date: 24 January 2026
bibliography: paper.bib
---

# Summary

In resource-constrained computing environments, deploying persistent knowledge management systems often necessitates significant infrastructure investment. Traditional architectures rely on persistent servers, managed databases, and recurring operational expenditure (OpEx), creating barriers for long-term sustainability in developing regions. `NIELIT StudentHub` is a reference implementation of a **Zero-OpEx Architecture**, designed to provide enterprise-grade data sovereignty and social networking capabilities without recurring infrastructure costs.

The software acts as a serverless middleware layer that orchestrates commodity SaaS tools into a coherent distributed system. It utilizes Google Sheets as a high-latency relational database, Google Apps Script as a serverless API gateway, Cloudinary for media optimization, and GitHub Pages for static hosting. This architecture demonstrates that complex application logic—including secure authentication, social graph management, and engagement algorithms—can be decoupled from traditional server environments.

A key contribution of this software is the implementation of domain-specific optimization algorithms for file-based storage systems, including a "Time-Decay Engagement Heuristic" for content ranking and "Reverse-Range Pagination" for O(1) data retrieval. These optimizations achieve a **33× scalability improvement** over standard implementation patterns, enabling the system to handle over 500,000 records while maintaining zero operational cost.

# Statement of need

The "digital divide" in research and engineering is often exacerbated by the high cost of maintaining digital infrastructure. While standard MERN (MongoDB, Express, React, Node.js) or LAMP stacks offer robustness, they impose a recurring financial burden ($1,200–$4,200 annually) regarding server hosting, database management, and security patches [@Heeks:2009]. For non-profit institutions, government agencies in developing nations, and research labs with finite grant cycles, this creates a "sustainability crisis" where knowledge repositories suffer from "digital rot" once funding ceases [@Vare:2021].

There is a lack of open-source frameworks that bridge the gap between rigid "No-Code" SaaS tools (which impose vendor lock-in and subscription fees) and custom "Pro-Code" architectures (which require persistent infrastructure).

`NIELIT StudentHub` fills this gap by providing a **Frugal Information System** framework [@Watson:2013]. It allows researchers and administrators to deploy self-healing, scalable repositories that persist indefinitely without maintenance budgets. While the primary testbed for this architecture is an institutional portfolio network, the underlying middleware is agnostic and can be adapted for any distributed data collection or knowledge management task requiring zero-cost persistence [@Syeda:2025].

# State of the field

Current solutions for institutional knowledge management bifurcate into two categories, neither of which addresses the Zero-OpEx requirement:

1.  **Commercial SaaS & LMS:** Platforms like Blackboard, Canvas, or LinkedIn provide robust features but lack data sovereignty and impose high licensing fees ($10k+/year). They function as "walled gardens," restricting API access and long-term data portability.
2.  **Traditional Open Source:** Systems like DSpace or custom MERN stacks offer sovereignty but shift the burden to infrastructure management. They require continuous server uptime, security patching, and database administration, which are resource-intensive.
3.  **No-Code/Low-Code Tools:** Solutions like Glide or Airtable offer rapid deployment but suffer from strict row limits (often <25,000 records) and steep pricing tiers for API access [@Glide:2024].

`NIELIT StudentHub` advances the field of **Frugal Computing** by demonstrating that "serverless" does not imply "cloud-vendor dependent billing." By leveraging the free tiers of massive-scale commodity providers through a novel API gateway, it offers a fourth alternative: full data ownership and limitless lifespan with zero recurring cost.

# Software architecture

## 1. Frontend: Progressive Web Application

Built with vanilla HTML5/CSS3/JavaScript (zero dependencies) to ensure long-term maintainability without "dependency hell." The client implements optimistic UI updates, local session management, and deep linking, hosted on GitHub Pages global CDN (<200ms latency).

## 2. Middleware: Serverless API Gateway

A custom Google Apps Script implementation handles 14 RESTful endpoints. It acts as an abstraction layer, converting raw HTTP requests into structured CRUD operations on the underlying sheet-based storage, adhering to the "Serverless" architectural pattern where operational logic is fully decoupled from infrastructure management [@Roberts:2016].
* **Security:** Implements SHA-256 salted hashing and `LockService` for concurrency control to prevent race conditions in the file-based backend.

## 3. Persistence: Hyper-Converged Data Store

The database consists of 7 normalized Google Sheets acting as tables (Users, Projects, Relations). To overcome the inherent latency of file-based storage, the system implements a **normalized relational schema** capable of storing 500,000 records, remaining well within the hard service quotas of 10 million cells per spreadsheet [@Google:2025].

## 4. Media & Deployment

Media assets are offloaded to Cloudinary (utilizing auto-format WebP compression) to preserve database bandwidth. The entire infrastructure is deployable via GitHub Actions, which manages secret injection and `config.js` generation, ensuring a reproducible deployment pipeline.

# Key algorithms

## 1. Time-Decay Engagement Heuristic

To manage content relevance in a distributed social graph without a dedicated recommendation engine, we implemented a gravity-based decay algorithm inspired by Hacker News [@HackerNews:Algorithm]:

$$S_p = \frac{(2 \cdot U_p) + (3 \cdot C_p)}{\sqrt{\Delta t + 1}}$$

Where $U_p$ represents upvotes and $C_p$ comments. The denominator $\sqrt{\Delta t + 1}$ ensures that older high-ranking content gradually yields to fresh content. This calculation is offloaded to a background worker (Time-Driven Trigger) to maintain sub-second API response times.

## 2. Reverse-Range Pagination

Standard Apps Script implementations suffer from $O(N)$ read times as datasets grow. We introduced a **Reverse-Range Strategy** that exploits the append-only nature of the dataset:

```javascript
const lastRow = sheet.getLastRow();
// Calculate exact range indices mathematically
const endRow = lastRow - ((page - 1) * 20);
const startRow = Math.max(2, endRow - 19);
// Fetch only the specific 20 rows required
const data = sheet.getRange(startRow, 1, endRow - startRow + 1, cols).getValues();
return data.reverse(); // O(1) constant time retrieval

```

This reduces read operations by 99.98% for large datasets, enabling the system to scale to its theoretical maximum of 500,000 records without performance degradation.

## 3. Self-Healing Cryptographic Migration

The system includes a security protocol that transparently upgrades legacy hash algorithms to salted SHA-256 upon user login. This allows for security hardening of the live database without requiring a maintenance window or password resets.

# Performance and scalability

**Theoretical Capacity**: 500,000 records (10M cells ÷ 20 cols/row), providing a ~27-year lifespan for typical institutional use cases.

**Concurrency**: The system handles concurrent writes via `LockService` mutexes. Production metrics from the NIELIT Ropar deployment (Jan 2026) show a median API response time of 950ms and 99.8% uptime with zero cost.

**Comparison**:

| Metric | StudentHub (Frugal) | Standard MERN | Low-Code (Glide) |
| --- | --- | --- | --- |
| Monthly OpEx | **$0** | $50-200 | $25-100 |
| Algorithmic Efficiency | **O(1) (Optimized)** | O(1) (Indexed) | O(N) |
| Data Ownership | ✅ Full | ✅ Full | ❌ Vendor Locked |

# Use cases and impact

**Target Audience**: Researchers in ICT4D (Information and Communication Technologies for Development), frugal engineering practitioners, and administrators in resource-constrained educational or government institutions.

**Impact**: The software has been deployed at NIELIT Ropar to archive 200+ engineering projects. It serves as a case study for **sustainable digital infrastructure**, demonstrating that "Zero-OpEx" is a viable architectural pattern for long-term knowledge preservation.

# Limitations and future work

**Current Limitations**:

1. **Concurrency Ceiling**: The lock-based write mechanism limits throughput to ~10k concurrent users.
2. **Search Latency**: Substring search requires linear scanning (mitigated via caching); integration with client-side search libraries (Lunr.js) is planned.
3. **Real-time Updates**: The current REST architecture requires polling; future iterations may explore Firebase integration for websocket capabilities.

**Research Directions**: Future work includes benchmarking this architecture against other serverless patterns and developing a generalized "Zero-OpEx" ODM (Object-Document Mapper) library for Google Apps Script.

# Community and contributions

**Repository**: [github.com/nielitropar/nielitropar.github.io](https://github.com/nielitropar/nielitropar.github.io)
**License**: MIT
**Documentation**: The repository includes comprehensive documentation on deployment, performance optimization, and architectural decision records (ADRs).

**Citation**:

```bibtex
@software{StudentHub2026,
  author = {Verma, Lovnish and Singh, Sarwan},
  title = {NIELIT StudentHub: A Zero-OpEx, Serverless Institutional Knowledge Management System},
  year = {2026},
  publisher = {GitHub},
  url = {[https://github.com/nielitropar/nielitropar.github.io](https://github.com/nielitropar/nielitropar.github.io)}
}

```

# AI usage disclosure

No generative AI tools were used in the writing of the software code. AI assistance was utilized for manuscript formatting and LaTeX structuring.

# Acknowledgements

We acknowledge the National Institute of Electronics & Information Technology (NIELIT), Ropar, for providing the testing environment, and the students who contributed to the stress-testing of the platform.

# References
